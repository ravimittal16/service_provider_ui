import { Facade } from "@core-data/iFacade";
import { Injectable } from "@angular/core";
import { Action, Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import {
  CustomerDto,
  CustomerDetailModel,
  CustomerModel,
} from "@shared/service-proxies/service-proxies";
import { CustomerState } from "./customers.state";
import * as customerActions from "./customers.actions";
import {
  selectAllCustomers,
  selectEditedCustomerDetail,
  selectCustomerErrors,
} from "./customers.selectors";

@Injectable({
  providedIn: "root",
})
export class CustomersFacade implements Facade {
  customers$: Observable<CustomerDto[]>;
  editedCustomerDetails$: Observable<CustomerDetailModel>;
  errors$: Observable<string[]>;
  constructor(private _store: Store<CustomerState>) {
    this.customers$ = this._store.pipe(select(selectAllCustomers));
    this.editedCustomerDetails$ = this._store.pipe(
      select(selectEditedCustomerDetail)
    );
    this.errors$ = this._store.pipe(select(selectCustomerErrors));
  }

  dispatch(action: Action) {
    this._store.dispatch(action);
  }

  saveUpdateCustomer(customerModel: CustomerModel) {
    this.dispatch(
      customerActions.processCreateEditCustomerAction({
        customerModel: customerModel,
      })
    );
  }

  loadCustomers(companyId: number) {
    this.dispatch(
      customerActions.loadCustomersAction({ companyId: companyId })
    );
  }

  loadEditedCustomerDetail(customerId: number) {
    this.dispatch(customerActions.clearPreviousEditedDetails());
    this.dispatch(
      customerActions.loadEditedCustomerDetails({ customerId: customerId })
    );
  }

  importCustomers() {
    this.dispatch(customerActions.importCustomerAction());
  }
}
