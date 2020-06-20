import { ActionReducerMap } from "@ngrx/store";

import * as fromAccountRegister from "./register/register.reducers";
import * as fromRegisterSelectors from "./register/register.selectors";

import * as fromCustomers from "./customers/customers.reducers";
import * as customerStates from "./customers/customers.state";
import * as customersSelectors from "./customers/customers.selectors";

import * as fromLogin from "./login/login.reducers";
import * as loginStates from "./login/login.state";
import * as fromAuthSelectors from "./login/login.selectors";

export interface AppState {
  accountRegister: fromAccountRegister.AccountRegisterState;
  customers: customerStates.CustomerState;
  userAuth: loginStates.LoginState;
}

export const reducers: ActionReducerMap<AppState> = {
  accountRegister: fromAccountRegister.accountRegisterReducer,
  customers: fromCustomers.reducer,
  userAuth: fromLogin.loginReducer,
};

// ==========================================================
// REGISTRATION
// ==========================================================
export const selectRegisterState = fromRegisterSelectors.selectRegisterState;

export const registrationErrors = fromRegisterSelectors.registrationErrors;

export const registrationUiState = fromRegisterSelectors.registrationUiState;

export const selectExternalSignModel =
  fromRegisterSelectors.selectExternalSignModel;

// ==========================================================
// CUSTOMERS
// ==========================================================
export const selectAllCustomers = customersSelectors.selectAllCustomers;
// ==========================================================
// LOGIN
// ==========================================================
export const isAuthenticated = fromAuthSelectors.isAuthenticated;
export const authToken = fromAuthSelectors.accessToken;
