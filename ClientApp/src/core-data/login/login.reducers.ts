import { on, createReducer, Action } from "@ngrx/store";

import { LoginState } from "./login.state";

import * as loginActions from "./login.actions";

export const initialState: LoginState = {
  isRunning: false,
  response: null,
  accessToken: null,
  isAuthenticated: false,
  error: "",
  loginModel: null,
  userId: "",
};

const _loginReducer = createReducer(
  initialState,
  on(loginActions.loginSuccess, (state: LoginState, props) => ({
    ...state,
    isRunning: false,
    accessToken: props.payload.accessToken,
    userId: props.payload.userId,
    response: props.payload,
    isAuthenticated: true,
  })),
  on(loginActions.loginFailure, (state: LoginState) => ({
    ...state,
    errors: ["error while login"],
    isRunning: false,
    userId: null,
    isAuthenticated: false,
    response: null,
  })),
  on(loginActions.loginRunningAction, (state: LoginState, props) => ({
    ...state,
    isRunning: props.payload,
  })),
  on(loginActions.loginCompletedAction, (state: LoginState, props) => ({
    ...state,
    isRunning: false,
  }))
);

export function loginReducer(state: LoginState | undefined, action: Action) {
  return _loginReducer(state, action);
}
