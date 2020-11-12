import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductsState } from "./products.state";
import { productsStoreFeatureKey, adapter } from "./products.reducers";

export const productsFeatureState = createFeatureSelector<ProductsState>(
  productsStoreFeatureKey
);

// ==========================================================
// Product Adapter Selectors
// ==========================================================

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectProductIds = createSelector(productsFeatureState, selectIds);
export const selectProductEntities = createSelector(
  productsFeatureState,
  selectEntities
);
export const selectAllProducts = createSelector(
  productsFeatureState,
  selectAll
);
export const selectAllServices = createSelector(selectAllProducts, (products) =>
  products.filter((x) => x.type === "Service")
);
export const selectProductsByFilter = createSelector(
  productsFeatureState,
  (state) => state.filteredProducts[state.selectedGroupFromModal.groupName]
);
