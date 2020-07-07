import { ActionReducerMap } from "@ngrx/store";

import * as fromAccountRegister from "./register/register.reducers";
import * as fromRegisterStateSelectors from "./register/register.selectors";

import * as fromCustomers from "./customers/customers.reducers";
import * as customerStates from "./customers/customers.state";
import * as fromCustomersStateSelectors from "./customers/customers.selectors";

import * as fromLogin from "./login/login.reducers";
import * as loginStates from "./login/login.state";
import * as fromAuthSelectors from "./login/login.selectors";
// ==========================================================
// PRODUCT STORE IMPORTS
// ==========================================================
import * as fromProductState from "./products-store/products.state";
import * as fromProductReducers from "./products-store/products.reducers";
import * as fromProductsStateSelectors from "./products-store/products.selectors";

export interface AppState {
  accountRegister: fromAccountRegister.AccountRegisterState;
  customers: customerStates.CustomerState;
  userAuth: loginStates.LoginState;
  products: fromProductState.ProductsState;
}

export const reducers: ActionReducerMap<AppState> = {
  accountRegister: fromAccountRegister.accountRegisterReducer,
  customers: fromCustomers.reducer,
  userAuth: fromLogin.loginReducer,
  products: fromProductReducers.reducer,
};

// ==========================================================
// REGISTRATION
// ==========================================================
export const selectRegisterState =
  fromRegisterStateSelectors.selectRegisterState;

export const registrationErrors = fromRegisterStateSelectors.registrationErrors;

export const registrationUiState =
  fromRegisterStateSelectors.registrationUiState;

export const selectExternalSignModel =
  fromRegisterStateSelectors.selectExternalSignModel;

// ==========================================================
// CUSTOMERS
// ==========================================================
export const selectAllCustomers =
  fromCustomersStateSelectors.selectAllCustomers;
export const selectEditedCustomerDetail =
  fromCustomersStateSelectors.selectEditedCustomerDetail;
export const selectCustomerErrors =
  fromCustomersStateSelectors.selectCustomerErrors;
export const selectCustomerUiState =
  fromCustomersStateSelectors.selectCustomerUiState;

// ==========================================================
// PRODUCTS
// ==========================================================
export const selectAllProducts = fromProductsStateSelectors.selectAllProducts;
// ==========================================================
// LOGIN
// ==========================================================
export const isAuthenticated = fromAuthSelectors.isAuthenticated;
export const authToken = fromAuthSelectors.accessToken;
export const isBusyLogin = fromAuthSelectors.isBusy;
