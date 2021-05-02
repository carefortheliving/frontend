/* eslint-disable react-hooks/exhaustive-deps */
import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { firebaseAnalytics } from 'src/components/common/AuthProvider/View';
import {
  getHomeRoute,
  getLoginRoute,
  getViewRequestRoute,
} from 'src/components/common/RouterOutlet/routerUtils';
import { useSnackbar } from 'src/components/common/SnackbarProvider/View';
import useFirebase from 'src/hooks/useFirebase';
import useFirestore from 'src/hooks/useFirestore';
import useGeo from 'src/hooks/useGeo';
import { useAppStore } from 'src/stores/appStore';
import { RequestType } from 'src/types';

export interface CreateRequestProps {
  isEdit?: boolean;
}

const useModel = (props: CreateRequestProps) => {
  const { isEdit } = props;
  const app = useAppStore();
  const { auth } = useFirebase();
  const defaultValues = {
    requestTitle: undefined,
    requestDescription: undefined,
    requesterName: undefined,
    requestCategory: undefined,
    patientGender: undefined,
    patientBloodGroup: undefined,
    patientAge: undefined,
    patientState: undefined,
    patientDistrict: undefined,
    requesterContactNumber: undefined,
  } as Partial<RequestType>;
  const { handleSubmit, control, setValue } = useForm({ defaultValues });
  const { states } = useGeo();
  const [districts, setDistricts] = useState([]);
  const history = useHistory();
  const params = useParams();
  const { addRequest, updateRequest, getRequest } = useFirestore();
  const snackbar = useSnackbar();
  const [data, setData] = useState(undefined as undefined | RequestType);

  useEffect(() => {
    firebaseAnalytics.logEvent('create/edit_request_visited');
    loadData();
    app.setBackButton(true);
  }, []);

  useEffect(() => {
    setValue('requesterName', auth?.user?.displayName);
  }, [auth?.user?.displayName]);

  useEffect(() => {
    ensurePermissions();
  }, [data?.requesterEmail]);

  useEffect(() => {
    prefillData();
  }, [data]);

  useEffect(() => {
    app.setTitle(isEdit ? 'Edit Request' : 'Create Request');
  }, [isEdit]);

  const isValidUser = () => {
    return data?.requesterEmail ?
      data?.requesterEmail === auth?.user?.email :
      !!auth?.user?.email;
  };

  const ensurePermissions = () => {
    if (!isValidUser()) {
      history.push(getLoginRoute());
    }
  };

  const loadData = async () => {
    const existingRequest = isEdit ?
      await getRequest(params?.docId) :
      undefined;
    if (typeof existingRequest === 'object') {
      setData(existingRequest as any);
    }
  };

  const prefillData = async () => {
    data &&
      Object.keys(data).forEach((key) => {
        setValue(key as any, data?.[key]);
      });
  };

  const handleStateChange = (state: string) => {
    // getValues().state.value
    const newDistricts =
      states[state]?.map((el) => ({ value: el.city, label: el.city })) || [];
    setDistricts(newDistricts);
    setValue('patientDistrict', newDistricts[0]);
  };

  const validateFields = (data: RequestType) => {
    const requiredKeys: (keyof Partial<RequestType>)[] = [
      'requestTitle',
      'requestCategory',
      'patientBloodGroup',
      'requestDescription',
      'requesterContactNumber',
    ];
    const missingKey = requiredKeys.find((key) => !data?.[key]);
    if (missingKey) {
      snackbar.show('error', `Field "${missingKey}" must not be empty!`);
      return false;
    }
    return true;
  };

  const onSubmit = async (data: RequestType) => {
    if (!isValidUser()) {
      snackbar.show('error', `You're not authorized for the action!`);
      return;
    }
    if (!validateFields(data)) return;
    try {
      const payload: RequestType = pickBy(data, identity) as any;
      const res = isEdit ?
        await updateRequest(params?.docId, payload) :
        await addRequest({
          ...payload,
          requestStatus: { value: 'open', label: 'Open' },
          requesterEmail: auth?.user?.email,
        });
      snackbar.show(
          'success',
          `Request 
          ${ isEdit ? 'updated' : 'created' } successfully! Please also keep an eye on your post comment thread and useful links tab`,
      );
      // message.success('Request created successfully!')
      history.push(getViewRequestRoute(params?.docId || (res as any)?.id));
    } catch (e) {
      console.error('Error adding document: ', e);
      snackbar.show(
          'error',
          `Couldn't ${
          isEdit ? 'update' : 'create'
          } request!\n All the fields are mandatory!`,
      );
      // message.error(`Couldn't create request!`);
    }
  };

  const handleCancel = async () => {
    history.push(getHomeRoute());
  };

  return {
    auth,
    data,
    isEdit,
    handleSubmit,
    districts,
    states,
    control,
    handleStateChange,
    onSubmit,
    handleCancel,
  };
};

export default useModel;
