import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  customPricingStoreFeatureKey,
  individualPricingAdapter,
  groupPricingAdapter,
} from "./custom.pricing.reducer";
import { CustomPricingStoreState } from "./custom.pricing.state";

export const expenseStoreState = createFeatureSelector<CustomPricingStoreState>(
  customPricingStoreFeatureKey
);

const {
  selectAll: selectAllIndividualPricing,
} = individualPricingAdapter.getSelectors<CustomPricingStoreState>(
  (x) => x.individualPricingState
);

const {
  selectAll: selectAllPricingGroups,
} = groupPricingAdapter.getSelectors<CustomPricingStoreState>(
  (x) => x.groupPricingState
);

export const selectAllIndividualPricingList = createSelector(
  expenseStoreState,
  selectAllIndividualPricing
);

export const selectAllPricingGroupsList = createSelector(
  expenseStoreState,
  selectAllPricingGroups
);

export const selectAllErrors = createSelector(
  expenseStoreState,
  (state) => state.errors
);
