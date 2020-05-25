import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AccountRegisterState } from "./register.reducers";

export const selectRegisterState = createFeatureSelector<AccountRegisterState>(
  "accountRegister"
);

export const errors = (state: AccountRegisterState) => state.errors;
export const busyState = (state: AccountRegisterState) => state.busyState;
export const externalModel = (state: AccountRegisterState) => state.model;

export const registrationErrors = createSelector(selectRegisterState, errors);

export const registrationUiState = createSelector(
  selectRegisterState,
  busyState
);

export const selectExternalSignModel = createSelector(
  selectRegisterState,
  externalModel
);
