import { createSelector, createFeatureSelector } from "@ngrx/store";
import { CustomerState } from "./customers.state";

import * as fromCustomerReducers from "./customers.reducers";

export const selectCustomersFeature = createFeatureSelector<CustomerState>(
  "customers"
);

export const selectAllCustomers = createSelector(
  selectCustomersFeature,
  fromCustomerReducers.selectAllCustomers
);
