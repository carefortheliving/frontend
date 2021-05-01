import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';
import { atom, RecoilState } from 'recoil';
import { defaultFilters as defaultRequestsFilters } from 'src/components/pages/Dashboard/constants';
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
          ...defaultFilters,
        },
      });
      setState(valOrUpdated as any);
    };

    const filtersCount = Object.keys(pickBy(state?.[key], identity)).length;

    return {
      appliedFilters: state?.[key] as Partial<T> | undefined,
      filtersCount,
      setFilters,
      resetFilters,
    };
  };
