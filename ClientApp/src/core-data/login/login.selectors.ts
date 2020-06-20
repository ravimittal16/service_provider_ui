import { createSelector, createFeatureSelector } from "@ngrx/store";
import { LoginState } from "./login.state";

export const selectLoginFeature = createFeatureSelector<LoginState>("Login");

const _isAuthenticated = (state: LoginState) => state.isAuthenticated;
const _authToken = (state: LoginState) => state.accessToken;

export const accessToken = createSelector(selectLoginFeature, _authToken);

export const isAuthenticated = createSelector(
  selectLoginFeature,
  _isAuthenticated
);
