import { createAction, props } from "@ngrx/store";
import { ProductDto } from "@shared/service-proxies/service-proxies";

// ==========================================================
// DATA IMPORT ACTIONS
// ==========================================================
export const importProductsStartAction = createAction(
  "[Products] Import Initiated"
);
export const importProductsCompletedAction = createAction(
  "[Products] Import Completed",
  props<{ isSuccess: boolean; errors: string[] }>()
);
// ==========================================================
// PRODUCTS LOAD ACTIONS
// ==========================================================
export const loadProductsAction = createAction("[Products] load triggered");
export const productsLoadedSuccessAction = createAction(
  "[Products] loaded completed success.",
  props<{ products: ProductDto[] }>()
);
export const productsLoadedErrorAction = createAction(
  "[Products] loaded completed success.",
  props<{ errors: string[] }>()
);
// ==========================================================
// PRODUCT CREATE/UPDATE ACTIONS
// ==========================================================

// ==========================================================
// OTHER ACTION
// ==========================================================
export const onGroupSelectionAction = createAction(
  "[Products] On Group Selected",
  props<{ group: any }>()
);
export const loadProductsByFilterAction = createAction(
  "[Products] Loading products by filter",
  props<{ filterBy: string }>()
);
export const productsLoadedByFilterAction = createAction(
  "[Products] Loaded products by filter",
  props<{ products: ProductDto[]; filterBy: string }>()
);
