import * as productsActions from "./products.actions";
import { Injectable } from "@angular/core";
import { BaseEffect } from "@core-data/base.effect";
import { ofType, createEffect, Actions } from "@ngrx/effects";
import { mergeMap, map, catchError } from "rxjs/operators";
import { ProductsServiceProxy } from "@shared/service-proxies/service-proxies";
import { of } from "rxjs";

@Injectable()
export class ProductsStoreEffects extends BaseEffect {
  constructor(
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
            if (response.length > 0 && response[0].isSuccess)
              //return customerActions.loadCustomersAction({ companyId: 0 });
              return null;
          })
        )
      )
    );
  });

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productsActions.loadProductsAction),
      mergeMap((action) =>
        this.productsService.getAllProducts().pipe(
          map((data) => {
            return productsActions.productsLoadedSuccessAction({
              products: data,
            });
          }),
          catchError((error) => {
            return of(
              productsActions.productsLoadedErrorAction({
                errors: ["Error while loading customers.", error],
              })
            );
          })
        )
      )
    );
  });
}
