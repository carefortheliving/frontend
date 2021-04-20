import * as React from 'react';
import { RecoilState, useRecoilState } from 'recoil';

type CB<T> = (updatedState: T) => void;
type SetState<T> = (newState: Partial<T>, cb?: CB<T>) => void;

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

