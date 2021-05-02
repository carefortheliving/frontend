/* eslint-disable react-hooks/exhaustive-deps */
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { firebaseAnalytics } from 'src/components/common/AuthProvider/View';
import {
  getHomeRoute,
  getLoginRoute,
  getViewDonationRoute,
} from 'src/components/common/RouterOutlet/routerUtils';
import { useSnackbar } from 'src/components/common/SnackbarProvider/View';
import useFirebase from 'src/hooks/useFirebase';
import useFirestore from 'src/hooks/useFirestore';
import useGeo from 'src/hooks/useGeo';
import { useAppStore } from 'src/stores/appStore';
import { DonationType } from 'src/types';

export interface CreateDonationProps {
  isEdit?: boolean;
}

const useModel = (props: CreateDonationProps) => {
  const { isEdit } = props;
  const app = useAppStore();
  const { auth } = useFirebase();
  const defaultValues = {
    donationTitle: undefined,
    donationDescription: undefined,
    donorName: undefined,
    donationCategory: undefined,
    donorGender: undefined,
    donorBloodGroup: undefined,
    donorAge: undefined,
    donorState: undefined,
    donorDistrict: undefined,
    donorContactNumber: undefined,
    donorTravelWillingness: undefined,
    covidRecoveryDate: undefined,
    antibodyTestStatus: undefined,
    vaccinationStatus: undefined,
    medicalComplication: undefined,
  } as Partial<DonationType>;
  const { handleSubmit, control, setValue, getValues, register, watch } = useForm({ defaultValues });
  const { states } = useGeo();
  const [districts, setDistricts] = useState([]);
  const history = useHistory();
  const params = useParams();
  const { addDonation, updateDonation, getDonation } = useFirestore();
  const snackbar = useSnackbar();
  const [data, setData] = useState(undefined as undefined | DonationType);

  useEffect(() => {
    firebaseAnalytics.logEvent('create/edit_donation_visited');
    loadData();
    app.setBackButton(true);
  }, []);

  useEffect(() => {
    setValue('donorName', auth?.user?.displayName);
  }, [auth?.user?.displayName]);

  useEffect(() => {
    ensurePermissions();
  }, [data?.donorEmail]);

  useEffect(() => {
    prefillData();
  }, [data]);

  useEffect(() => {
    app.setTitle(isEdit ? 'Edit Donation' : 'Create Donation');
  }, [isEdit]);

  const isValidUser = () => {
    return data?.donorEmail ?
      data?.donorEmail === auth?.user?.email :
      !!auth?.user?.email;
  };

  const ensurePermissions = () => {
    if (!isValidUser()) {
      history.push(getLoginRoute());
    }
  };

  const loadData = async () => {
    const existingDonation = isEdit ?
      await getDonation(params?.docId) :
      undefined;
    if (typeof existingDonation === 'object') {
      setData(existingDonation as any);
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
    setValue('donorDistrict', newDistricts[0]);
  };

  const validateFields = (data: DonationType) => {
    const requiredKeys: (keyof Partial<DonationType>)[] = [
      'donationTitle',
      'donationCategory',
      'donorBloodGroup',
      'donationDescription',
      'donorContactNumber',
    ];
    const missingKey = requiredKeys.find((key) => !data?.[key]);
    if (missingKey) {
      snackbar.show('error', `Field "${missingKey}" must not be empty!`);
      return false;
    }
    return true;
  };

  const onSubmit = async (data: DonationType) => {
    if (!isValidUser()) {
      snackbar.show('error', `You're not authorized for the action!`);
      return;
    }
    if (!validateFields(data)) return;
    try {
      const payload: DonationType = pickBy(data, identity) as any;
      const res = isEdit ?
        await updateDonation(params?.docId, payload) :
        await addDonation({
          ...payload,
          donationStatus: { value: 'open', label: 'Open' },
          donorEmail: auth?.user?.email,
        });
      snackbar.show(
          'success',
          `Donation 
          ${ isEdit ? 'updated' : 'created' } successfully! Please also keep an eye on your post comment thread and useful links tab`,
      );
      // message.success('Donation created successfully!')
      history.push(getViewDonationRoute(params?.docId || (res as any)?.id));
    } catch (e) {
      console.error('Error adding document: ', e);
      snackbar.show(
          'error',
          `Couldn't ${
          isEdit ? 'update' : 'create'
          } donation!\n All the fields are mandatory!`,
      );
      // message.error(`Couldn't create donation!`);
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
    getValues,
    setValue,
    watch,
  };
};

export default useModel;
