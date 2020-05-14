import * as fromAccountRegister from "./register.reducers";
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from "@ngrx/store";

export interface AppState {
  accountRegister: fromAccountRegister.AccountRegisterState;
}

export const accountReducers: ActionReducerMap<AppState> = {
  accountRegister: fromAccountRegister.accountRegisterReducer,
};
export const selectRegisterState = createFeatureSelector<
  fromAccountRegister.AccountRegisterState
>("accountRegister");

export const registrationErrors = createSelector(
  selectRegisterState,
  fromAccountRegister.errors
);

export const registrationUiState = createSelector(
  selectRegisterState,
  fromAccountRegister.busyState
);
