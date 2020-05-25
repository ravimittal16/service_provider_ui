import { ActionReducerMap } from "@ngrx/store";

import * as fromAccountRegister from "./register/register.reducers";
import * as fromRegisterSelectors from "./register/register.selectors";

import * as fromCustomers from "./customers/customers.reducers";
import * as customerStates from "./customers/customers.state";
import * as customersSelectors from "./customers/customers.selectors";

export interface AppState {
  accountRegister: fromAccountRegister.AccountRegisterState;
  customers: customerStates.CustomerState;
}

export const reducers: ActionReducerMap<AppState> = {
  accountRegister: fromAccountRegister.accountRegisterReducer,
  customers: fromCustomers.reducer,
};
export const selectRegisterState = fromRegisterSelectors.selectRegisterState;

export const registrationErrors = fromRegisterSelectors.registrationErrors;

export const registrationUiState = fromRegisterSelectors.registrationUiState;

export const selectExternalSignModel =
  fromRegisterSelectors.selectExternalSignModel;

export const selectAllCustomers = customersSelectors.selectAllCustomers;
