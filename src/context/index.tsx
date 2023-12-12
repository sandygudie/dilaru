"use client";
import * as React from "react";

export interface IAppState {
  userWeb5data: {
    web5: {};
    did: string;
  };
  name: string;
  profile: {};
}

export const initialState: IAppState = {
  userWeb5data: {
    web5: {},
    did: "",
  },
  name: "",
  profile: {},
};

export enum ActionType {
  SET_USERWEB5DATA = "SET_USERWEB5DATA",
  SET_NAME = "SET_NAME",
  SET_PROFILE = "SET_PROFILE",
}

export type IAction = {
  type: ActionType;
  payload: IAppState;
};

export interface IAppContext {
  state: IAppState;

  getUserWeb5Data: (payload: any) => void;
  setName: (payload: any) => void;
  setProfile: (payload: any) => void;
}

const AppContext = React.createContext<IAppContext>({
  state: {
    userWeb5data: {
      web5: {},
      did: "",
    },
    name: "",
    profile: {},
  },

  getUserWeb5Data: () => {},
  setName: () => {},
  setProfile: () => {},
});

const appReducer = (state: IAppState, action: IAction): typeof initialState => {
  const { type, payload } = action;

  switch (type) {
    case "SET_USERWEB5DATA": {
      return {
        ...state,
        userWeb5data: payload.userWeb5data,
      };
    }
    case "SET_NAME": {
      return { ...state, name: payload.name };
    }
    case "SET_PROFILE": {
      return { ...state, profile: payload };
    }
    default:
      return state;
  }
};

const AppContextProvider = ({ children }: any) => {
  const [state, dispatch] = React.useReducer(
    appReducer,
    initialState as IAppState
  );

  const value = {
    state,

    getUserWeb5Data: (payload: any) => {
      dispatch({ type: ActionType.SET_USERWEB5DATA, payload });
    },
    setName: (payload: any) => {
      dispatch({ type: ActionType.SET_NAME, payload });
    },
    setProfile: (payload: any) => {
      dispatch({ type: ActionType.SET_PROFILE, payload });
    },
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
