import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CompanyState } from "./company.state";
import { copamnyStoreFeatureKey, adapter } from "./company.reducers";

export const companyFeatureState = createFeatureSelector<CompanyState>(
  copamnyStoreFeatureKey
);

export const companyDetailsSelector = createSelector(
  companyFeatureState,
  (s) => s.copmanyDetails
);

export const companyBusinessHoursSelector = createSelector(
  companyFeatureState,
  (s) => s.businessHours
);

export const copmanyBusyStateSelector = createSelector(
  companyFeatureState,
  (s) => s.isBusy
);

export const selectErrors = createSelector(
  companyFeatureState,
  (s) => s.errors
);
