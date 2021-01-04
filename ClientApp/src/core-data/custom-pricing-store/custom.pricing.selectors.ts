import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  customPricingStoreFeatureKey,
  individualPricingAdapter,
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

export const selectAllIndividualPricingList = createSelector(
  expenseStoreState,
  selectAllIndividualPricing
);

export const selectAllErrors = createSelector(
  expenseStoreState,
  (state) => state.errors
);
