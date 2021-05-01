import { RecoilState, useRecoilState } from 'recoil';

type CB<T> = (updatedState: T) => void;
type SetState<T> = (newState: Partial<T>, cb?: CB<T>) => void;

const useGenericRecoilState = <T>(
  recoilStateStore: RecoilState<T>,
): [T, SetState<T>] => {
  const [state, setState] = useRecoilState(recoilStateStore);
  const setStateLocal: SetState<T> = (valOrUpdated: Partial<T> | ((currVal: Partial<T>) => Partial<T>)) => {
    if (typeof valOrUpdated === 'function') {
      setState((state) => ({
        ...state,
        ...valOrUpdated(state),
      }));
    } else {
      setState((state) => ({
        ...state,
        ...valOrUpdated,
      }));
    }
  };

  return [state as T, setStateLocal];
};

export default useGenericRecoilState;

