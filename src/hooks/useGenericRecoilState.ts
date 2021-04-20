import { RecoilState, useRecoilState } from 'recoil';

export type CB<T> = (updatedState: T) => void;
export type SetState<T> = (newState: Partial<T>, cb?: CB<T>) => void;

function useGenericRecoilState<T>(
  recoilStateStore: RecoilState<T>
): [T, SetState<T>] {
  const [state, setState] = useRecoilState(recoilStateStore);
  const setStateLocal: SetState<T> = (newState: Partial<T>) => {
    setState({
      ...state,
      ...newState,
    });
  };

  return [state as T, setStateLocal];
}

export default useGenericRecoilState;

