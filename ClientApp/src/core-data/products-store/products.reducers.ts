import { ProductDto } from "@shared/service-proxies/service-proxies";
import { ProductsState } from "./products.state";
import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as productsActions from "./products.actions";
import { on, Action, createReducer } from "@ngrx/store";
import { state } from "@angular/animations";

export const productsStoreFeatureKey = "products";

export function selectProductId(a: ProductDto): string {
  return a.productId.toString();
}

export const adapter: EntityAdapter<ProductDto> = createEntityAdapter<
  ProductDto
>({
  selectId: selectProductId,
});

export const initialState: ProductsState = adapter.getInitialState({
  companyId: 0,
  isBusy: false,
  errors: [],
  success: false,
  selectedGroupFromModal: null,
  filteredProducts: {},
});

const productsFeatureReducer = createReducer(
  initialState,
  on(
    productsActions.importProductsCompletedAction,
    (state: ProductsState, props) => ({
      ...state,
      success: props.isSuccess,
      errors: props.errors,
    })
  ),
  on(
    productsActions.productsLoadedSuccessAction,
    (state: ProductsState, props) => adapter.addMany(props.products, state)
  ),
  on(
    productsActions.productsLoadedByFilterAction,
    (state: ProductsState, props) => {
      const __filerProducts = { ...state.filteredProducts };

      __filerProducts[props.filterBy] = [...props.products];
      console.log(__filerProducts);
      return {
        ...state,
        filteredProducts: __filerProducts,
      };
    }
  ),
  on(productsActions.onGroupSelectionAction, (state: ProductsState, props) => {
    const __state = state;

    return {
      ...state,
      selectedGroupFromModal: props.group,
    };
  })
);

export function reducer(state: ProductsState | undefined, action: Action) {
  return productsFeatureReducer(state, action);
}
