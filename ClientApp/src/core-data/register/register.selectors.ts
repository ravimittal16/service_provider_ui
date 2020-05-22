import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AccountRegisterState, errors, busyState } from "./register.reducers";

export const selectRegisterState = createFeatureSelector<AccountRegisterState>(
  "accountRegister"
);

export const registrationErrors = createSelector(selectRegisterState, errors);

export const registrationUiState = createSelector(
  selectRegisterState,
  busyState
);
