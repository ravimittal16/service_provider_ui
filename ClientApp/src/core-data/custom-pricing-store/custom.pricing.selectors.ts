import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  customPricingStoreFeatureKey,
  individualPricingAdapter,
  groupPricingAdapter,
} from "./custom.pricing.reducer";
import { CustomPricingStoreState } from "./custom.pricing.state";

export const customPricingStoreState = createFeatureSelector<CustomPricingStoreState>(
  customPricingStoreFeatureKey
);

const {
  selectAll: selectAllIndividualPricing,
} = individualPricingAdapter.getSelectors<CustomPricingStoreState>(
  (x) => x.individualPricingState
);

const groupPricingState = groupPricingAdapter.getSelectors<CustomPricingStoreState>(
  (x) => x.groupPricingState
);

const { selectAll: selectAllPricingGroups } = groupPricingState;

export const selectGroupDetails = createSelector(
  customPricingStoreState,
  (state) => state.groupPricingState?.selecteGroupDetails
);

export const selectAllIndividualPricingList = createSelector(
  customPricingStoreState,
  selectAllIndividualPricing
);

export const selectAllPricingGroupsList = createSelector(
  customPricingStoreState,
  selectAllPricingGroups
);

export const selectAllErrors = createSelector(
  customPricingStoreState,
  (state) => state.errors
);
