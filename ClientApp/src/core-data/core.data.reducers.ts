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
// ==========================================================
// USERS STORE IMPORTS
// ==========================================================
import * as fromUsersState from "./users-store/users.state";
import * as fromUsersReducers from "./users-store/users.redurcers";
import * as fromUsersStateSelectors from "./users-store/users.selectors";
// ==========================================================
// companySTORE company// ==========================================================
import * as fromCompanyState from "./company-store/company.state";
import * as fromCompanyReducers from "./company-store/company.reducers";
import * as fromCompanyStateSelectors from "./company-store/company.selectors";
// ==========================================================
// JOBS STORE IMPORTS
// ==========================================================
import * as fromJobsState from "./jobs-store/jobs.state";
import * as fromJobsReducers from "./jobs-store/jobs.reducers";
import * as fromJobsSelectors from "./jobs-store/jobs.selectors";

export interface AppState {
  accountRegister: fromAccountRegister.AccountRegisterState;
  customers: customerStates.CustomerState;
  userAuth: loginStates.LoginState;
  products: fromProductState.ProductsState;
  users: fromUsersState.UsersState;
  company: fromCompanyState.CompanyState;
  jobs: fromJobsState.JobsState;
}

export const reducers: ActionReducerMap<AppState> = {
  accountRegister: fromAccountRegister.accountRegisterReducer,
  customers: fromCustomers.reducer,
  userAuth: fromLogin.loginReducer,
  products: fromProductReducers.reducer,
  users: fromUsersReducers.reducer,
  company: fromCompanyReducers.reducer,
  jobs: fromJobsReducers.reducer,
};
// ==========================================================
// JOBS SELECTORS
// ==========================================================

export const selectAllJobs = fromJobsSelectors.selectAllJobs;
export const selectJobsFilter = fromJobsSelectors.selectJobsFilter;
export const selectJobLineItems = fromJobsSelectors.selectJobLineItems;
export const selectJobVisits = fromJobsSelectors.selectJobVisits;
export const selectActionPayload = fromJobsSelectors.selectActionPayload;
export const selectJobDetails = fromJobsSelectors.selectJobDetails;
export const selectVisitDetails = fromJobsSelectors.selectVisitDetails;
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
export const selectAllServices = fromProductsStateSelectors.selectAllServices;
// ==========================================================
// USERS SELECTORS
// ==========================================================
export const selectAllUsers = fromUsersStateSelectors.selectAllUsers;
export const usersBusyStateSelector =
  fromUsersStateSelectors.usersBusyStateSelector;
export const selectUsersStateErrors = fromUsersStateSelectors.selectErrors;
export const selectEmployeesList = fromUsersStateSelectors.selectEmployeesList;
export const selectTeamsList = fromUsersStateSelectors.selectTeamsList;
// ==========================================================
// LOGIN
// ==========================================================
export const isAuthenticated = fromAuthSelectors.isAuthenticated;
export const authToken = fromAuthSelectors.accessToken;
export const isBusyLogin = fromAuthSelectors.isBusy;
// ==========================================================
// COPMANY SELECTORS
// ==========================================================
export const copmanyStateErrors = fromCompanyStateSelectors.selectErrors;
export const copmanyDetails = fromCompanyStateSelectors.selectCompanyDetails;
export const copmanyBusinessHoursDetails =
  fromCompanyStateSelectors.companyBusinessHoursSelector;
export const isBusyStateCompany =
  fromCompanyStateSelectors.copmanyBusyStateSelector;
