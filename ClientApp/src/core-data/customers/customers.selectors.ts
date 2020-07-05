import { createSelector, createFeatureSelector } from "@ngrx/store";
import { CustomerState } from "./customers.state";

import * as fromCustomerReducers from "./customers.reducers";
import { customerFeatureKey } from "./customers.reducers";
import { ProductDto } from "@shared/service-proxies/service-proxies";

export const customerFeatureState = createFeatureSelector<CustomerState>(
  customerFeatureKey
);

export const selectAllCustomers = createSelector(
  customerFeatureState,
  fromCustomerReducers.selectAllCustomers
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
