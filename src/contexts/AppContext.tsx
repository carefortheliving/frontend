import React, { createContext, useReducer, useContext } from 'react';
import { UserInfo } from 'src/types';

export const AppContext = createContext({} as any);

const initialState = {
  backButton: false,
  title: 'Care for the Living',
  userInfo: undefined as UserInfo | undefined,
};

// Actions
export const BACK_BUTTON = 'BACK_BUTTON';
export const CHANGE_TITLE = 'CHANGE_TITLE';
export const SET_USER_INFO = 'SET_USER_INFO';

// Action creators
export const changeBackButton = (payload) => ({ type: BACK_BUTTON, payload });
export const changeTitle = (payload) => ({ type: CHANGE_TITLE, payload });
export const setUserInfo = (payload: UserInfo) => ({ type: SET_USER_INFO, payload });

// Reducer
export const appReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_TITLE:
      return { ...state, title: action.payload };
    case BACK_BUTTON:
      return { ...state, backButton: action.payload };
    case SET_USER_INFO:
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};

const AppProvider = (props) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const appData = { state, dispatch };

  return <AppContext.Provider value={appData} {...props} />;
};

function useAppContext() {
  return useContext<{
    dispatch: any;
    state: typeof initialState;
  }>(AppContext);
}

export { AppProvider, useAppContext };
