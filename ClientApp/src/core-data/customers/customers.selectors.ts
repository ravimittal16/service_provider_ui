import { createSelector, createFeatureSelector } from "@ngrx/store";
import { CustomerState } from "./customers.state";
import { map } from "rxjs/operators";

export const selectCustomersFeature = createFeatureSelector<CustomerState>(
  "customers"
);

export const customers = (state: CustomerState) => state.entities;

export const selectAllCustomers = createSelector(
  selectCustomersFeature,
  customers
);
