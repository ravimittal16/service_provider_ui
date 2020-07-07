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
export class ProductssFacade implements Facade {
  errors$: Observable<string[]>;
  isBusy$: Observable<boolean>;
  products$: Observable<ProductDto[]>;
  constructor(private _store: Store<ProductsState>) {
    this.products$ = this._store.pipe(
      select(fromProductSelectors.selectAllProducts)
    );
    // this.editedCustomerDetails$ = this._store.pipe(
    //   select(selectEditedCustomerDetail)
    // );
    // this.errors$ = this._store.pipe(select(selectCustomerErrors));
    // this.isBusy$ = this._store.pipe(select(selectCustomerUiState));
  }

  importCustomers() {
    this.dispatch(fromProductActions.importProductsStartAction());
  }

  loadProducts() {
    this.dispatch(fromProductActions.loadProductsAction());
  }

  dispatch(action: Action) {
    this._store.dispatch(action);
  }
}
