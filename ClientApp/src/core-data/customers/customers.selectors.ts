import { createSelector, createFeatureSelector } from "@ngrx/store";
import { CustomerState } from "./customers.state";

export const selectCustomersFeature = createFeatureSelector<CustomerState>(
  "customers"
);

export const customers = (state: CustomerState) => state.entities;
export const registrationErrors = createSelector(
  selectCustomersFeature,
  customers
);
