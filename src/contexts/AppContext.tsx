import React, { createContext, useContext, useReducer } from 'react';

export const AppContext = createContext({} as any);

const initialState = {
	backButton: false,
	title: 'Care for the Living',
};

// Actions
export const BACK_BUTTON = 'BACK_BUTTON';
export const CHANGE_TITLE = 'CHANGE_TITLE';

// Action creators
export const changeBackButton = (payload) => ({ type: BACK_BUTTON, payload });
export const changeTitle = (payload) => ({ type: CHANGE_TITLE, payload });

// Reducer
export const appReducer = (state, action) => {
	switch (action.type) {
	case CHANGE_TITLE:
		return { ...state, title: action.payload };
	case BACK_BUTTON:
		return { ...state, backButton: action.payload };
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
	return useContext(AppContext);
}

export { AppProvider, useAppContext };
