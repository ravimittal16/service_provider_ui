import { createSelector, createFeatureSelector } from "@ngrx/store";
import { CustomerState } from "./customers.state";

import * as fromCustomerReducers from "./customers.reducers";

export const customerFeatureState = createFeatureSelector<CustomerState>(
  "customers"
);

export const selectAllCustomers = createSelector(
  customerFeatureState,
  fromCustomerReducers.selectAllCustomers
);

export const selectEditedCustomerDetail = createSelector(
  customerFeatureState,
  (state) => state.editedCustomerDetails
);
