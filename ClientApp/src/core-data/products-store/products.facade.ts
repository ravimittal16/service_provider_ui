import { Injectable } from "@angular/core";
import { Facade } from "@core-data/iFacade";
import { Action, Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { ProductsState } from "./products.state";
import * as fromProductActions from "./products.actions";
import { ProductDto } from "@shared/service-proxies/service-proxies";
import * as fromProductSelectors from "./products.selectors";

@Injectable({
  providedIn: "root",
})
export class ProductsFacade implements Facade {
  errors$: Observable<string[]>;
  isBusy$: Observable<boolean>;
  products$: Observable<ProductDto[]>;
  servicesOnly$: Observable<ProductDto[]>;
  constructor(private _store: Store<ProductsState>) {
    this.products$ = this._store.pipe(
      select(fromProductSelectors.selectAllProducts)
    );
    this.servicesOnly$ = this._store.pipe(
      select(fromProductSelectors.selectAllServices)
    );
  }

  importProducts() {
    this.dispatch(fromProductActions.importProductsStartAction());
  }

  onGroupSelected(group: any) {
    this.dispatch(fromProductActions.onGroupSelectionAction({ group: group }));
    this.dispatch(
      fromProductActions.loadProductsByFilterAction({
        filterBy: group.groupName,
      })
    );
  }

  loadProducts() {
    this.dispatch(fromProductActions.loadProductsAction());
  }

  dispatch(action: Action) {
    this._store.dispatch(action);
  }
}
