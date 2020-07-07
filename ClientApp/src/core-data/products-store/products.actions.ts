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
