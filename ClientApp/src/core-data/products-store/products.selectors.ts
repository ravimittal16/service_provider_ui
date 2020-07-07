import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductsState } from "./products.state";
import { productsStoreFeatureKey, adapter } from "./products.reducers";

export const customerFeatureState = createFeatureSelector<ProductsState>(
  productsStoreFeatureKey
);

// ==========================================================
// Product Adapter Selectors
// ==========================================================

const { selectIds, selectEntities, selectAll } = adapter.getSelectors();

export const selectProductIds = selectIds;
export const selectProductEntities = selectEntities;
export const selectAllProducts = createSelector(
  customerFeatureState,
  selectAll
);
