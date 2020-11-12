import * as productsActions from "./products.actions";
import { Injectable } from "@angular/core";
import { BaseEffect } from "@core-data/base.effect";
import { ofType, createEffect, Actions } from "@ngrx/effects";
import {
  mergeMap,
  map,
  catchError,
  withLatestFrom,
  filter,
} from "rxjs/operators";
import { ProductsServiceProxy } from "@shared/service-proxies/service-proxies";
import { of } from "rxjs";
import { select, Store } from "@ngrx/store";
import { ProductsState } from "./products.state";
import * as allSelectors from "./products.selectors";

@Injectable()
export class ProductsStoreEffects extends BaseEffect {
  constructor(
    private _store: Store<ProductsState>,
    private productsService: ProductsServiceProxy,
    private actions$: Actions
  ) {
    super();
  }

  importProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productsActions.importProductsStartAction),
      mergeMap((action) =>
        this.productsService.importProducts().pipe(
          map((response) => {
            if (response.length > 0 && response[0].isSuccess) return null;
          })
        )
      )
    );
  });

  loadProductsByFilter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productsActions.loadProductsByFilterAction),
      withLatestFrom(this._store.select(allSelectors.selectProductsByFilter)),
      filter(([action, products]) => {
        return products === undefined || products.length === 0;
      }),
      mergeMap((action) => {
        return this.productsService.getAllProducts(action[0].filterBy).pipe(
          map((data) => {
            return productsActions.productsLoadedByFilterAction({
              products: data,
              filterBy: action[0].filterBy,
            });
          }),
          catchError((error) =>
            of(
              productsActions.productsLoadedErrorAction({
                errors: ["Error while loading products.", error],
              })
            )
          )
        );
      })
    );
  });

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productsActions.loadProductsAction),
      mergeMap((action) =>
        this.productsService.getAllProducts("").pipe(
          map((data) => {
            return productsActions.productsLoadedSuccessAction({
              products: data,
            });
          }),
          catchError((error) => {
            return of(
              productsActions.productsLoadedErrorAction({
                errors: ["Error while loading products.", error],
              })
            );
          })
        )
      )
    );
  });
}
