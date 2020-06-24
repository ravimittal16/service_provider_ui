import { createSelector, createFeatureSelector } from "@ngrx/store";
import { LoginState } from "./login.state";

export const currentAuthState = createFeatureSelector<LoginState>("login");

const _isAuthenticated = (state: LoginState) => state.isAuthenticated;
const _authToken = (state: LoginState) => state.accessToken;
const _isBusy = (state: LoginState) => state.isRunning || false;
const _userId = (state: LoginState) => state.userId;

export const authUserId = createSelector(currentAuthState, _userId);

export const isBusy = createSelector(currentAuthState, _isBusy);

export const accessToken = createSelector(currentAuthState, _authToken);

export const isAuthenticated = createSelector(
  currentAuthState,
  _isAuthenticated
);
