import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CompanyState } from "./company.state";
import { companyStoreFeatureKey, adapter } from "./company.reducers";

export const companyFeatureState = createFeatureSelector<CompanyState>(
  companyStoreFeatureKey
);

export const selectCompanyDetails = createSelector(
  companyFeatureState,
  (s) => s?.copmanyDetails
);

export const companyBusinessHoursSelector = createSelector(
  companyFeatureState,
  (s) => s?.businessHours
);

export const copmanyBusyStateSelector = createSelector(
  companyFeatureState,
  (s) => s.isBusy
);

export const selectErrors = createSelector(
  companyFeatureState,
  (s) => s.errors
);

export const selectCommonData = createSelector(
  companyFeatureState,
  (s) => s.commonData
);
export const selectCompanyFeatues = createSelector(
  companyFeatureState,
  (s) => s.features
);
