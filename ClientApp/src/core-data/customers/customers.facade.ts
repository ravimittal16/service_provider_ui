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
  selectCustomerUiState,
} from "./customers.selectors";

@Injectable({
  providedIn: "root",
})
export class CustomersFacade implements Facade {
  customers$: Observable<CustomerDto[]>;
  editedCustomerDetails$: Observable<CustomerDetailModel>;
  errors$: Observable<string[]>;
  isBusy$: Observable<boolean>;
  constructor(private _store: Store<CustomerState>) {
    this.customers$ = this._store.pipe(select(selectAllCustomers));
    this.editedCustomerDetails$ = this._store.pipe(
      select(selectEditedCustomerDetail)
    );
    this.errors$ = this._store.pipe(select(selectCustomerErrors));
    this.isBusy$ = this._store.pipe(select(selectCustomerUiState));
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

  deactivateCustomers(selectedIds: string[]) {
    this.dispatch(customerActions.customerUIStateAction({ isBusy: true }));
    this.dispatch(
      customerActions.executeCustomerBatchAction({ selectedIds: selectedIds })
    );
  }

  onCustomerModalOpened() {
    this.dispatch(customerActions.openCreateModalAction());
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
