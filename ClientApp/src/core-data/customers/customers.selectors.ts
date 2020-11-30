import { createSelector, createFeatureSelector } from "@ngrx/store";
import { CustomerState } from "./customers.state";

import * as fromCustomerReducers from "./customers.reducers";
import { customerFeatureKey } from "./customers.reducers";

export const customerFeatureState = createFeatureSelector<CustomerState>(
  customerFeatureKey
);

export const selectAllCustomers = createSelector(
  customerFeatureState,
  fromCustomerReducers.selectAllCustomers
);

//TODO: NEED TO WORK ORDER THAT | FILTER ONLY ACTIVE CUSTOMERS
export const selectAllActiveCustomers = createSelector(
  selectAllCustomers,
  (customers) => customers.filter((x) => x.id !== 0)
);

export const selectEditedCustomerDetail = createSelector(
  customerFeatureState,
  (state) => state.editedCustomerDetails
);

export const selectCustomerErrors = createSelector(
  customerFeatureState,
  (state) => state.errors
);

export const selectCustomerUiState = createSelector(
  customerFeatureState,
  (state) => state.isBusy
);
