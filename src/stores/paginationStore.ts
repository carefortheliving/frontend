import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';
import { useEffect } from 'react';
import { atom, RecoilState } from 'recoil';
import { defaultRequestsFilters } from 'src/components/pages/Dashboard/constants';
import useGenericRecoilState from 'src/hooks/useGenericRecoilState';

const defaultFilters = {
  dashboardRequestsFilters: defaultRequestsFilters,
};

const paginationStore = atom({
  key: 'pagination',
  default: defaultFilters,
});

export const usePaginationStore =
  <K extends keyof typeof defaultFilters, T extends (typeof defaultFilters)[K]>(key: K) => {
    const [state, setState] = useGenericRecoilState(paginationStore);

    useEffect(() => {
      // DANGER!
      // Stores can't have effects!
    }, []);

    const setFilters = (filtersToApply: Partial<T>) => {
      const valOrUpdated = (state) => ({
        [key]: {
          ...state?.[key],
          ...filtersToApply,
        },
      });
      setState(valOrUpdated as any);
    };

    const resetFilters = () => {
      const valOrUpdated = (state) => ({
        [key]: {
          ...state?.[key],
          ...defaultFilters?.[key],
        },
      });
      setState(valOrUpdated as any);
    };

    const getFiltersCount = (ignoreList?: (keyof T)[]) => {
      return Object.keys(pickBy(state?.[key], (val, key) => {
        return !!val && !(ignoreList?.includes(key as any));
      })).length;
    };

    return {
      defaultFilters: defaultFilters?.[key],
      appliedFilters: state?.[key] as Partial<T>,
      getFiltersCount,
      setFilters,
      resetFilters,
    };
  };
