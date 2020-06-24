import { Facade } from "@core-data/iFacade";
import { Injectable } from "@angular/core";
import { Action, Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { CustomerDto } from "@shared/service-proxies/service-proxies";
import { CustomerState } from "./customers.state";
import * as customerActions from "./customers.actions";
import { selectAllCustomers } from "./customers.selectors";

import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CustomersFacade implements Facade {
  customers$: Observable<CustomerDto[]>;
  constructor(private _store: Store<CustomerState>) {
    this.customers$ = this._store.pipe(select(selectAllCustomers));
  }
  dispatch(action: Action) {
    this._store.dispatch(action);
  }
  loadCustomers(companyId: number) {
    this.dispatch(
      customerActions.loadCustomersAction({ companyId: companyId })
    );
  }

  importCustomers() {
    this.dispatch(customerActions.importCustomerAction());
  }
}
