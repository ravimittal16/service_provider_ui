import { Injectable } from "@angular/core";
import { Facade } from "@core-data/iFacade";
import { Action, select, Store } from "@ngrx/store";
import {
  CreateExpenseModel,
  ExpenseCodeModel,
} from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";
import { ExpenseState } from "./expense.state";
import * as fromAllActions from "./expense.actions";
import * as fromAllSelectors from "./expense.selectors";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: "root",
})
export class ExpenseFacade implements Facade {
  errors$: Observable<string[]>;
  isBusy$: Observable<boolean>;
  expenseCodes$: Observable<ExpenseCodeModel[]>;
  constructor(private _store: Store<ExpenseState>) {
    this.expenseCodes$ = this._store.pipe(
      select(fromAllSelectors.selectAllExpenseCodes)
    );
    this.errors$ = this._store.pipe(select(fromAllSelectors.selectAllErrors));
  }

  addUpdareExpense(model: CreateExpenseModel, modal: NgbActiveModal) {
    this.clearAllErrors();
    this.dispatch(fromAllActions.setActiveModalRef({ modal: modal }));
    this.dispatch(fromAllActions.uiStateBusyAction({ isBusy: true }));
    this.dispatch(
      fromAllActions.triggerAddUpdateExpenseAction({ model: model })
    );
  }

  clearAllErrors() {
    this.dispatch(fromAllActions.updateErrorStateAction({ errors: null }));
  }

  addUpdateExpenseCode(model: ExpenseCodeModel, modal: NgbActiveModal) {
    this.clearAllErrors();
    this.dispatch(fromAllActions.setActiveModalRef({ modal: modal }));
    this.dispatch(fromAllActions.uiStateBusyAction({ isBusy: true }));
    this.dispatch(
      fromAllActions.triggerAddUpdateExpenseCodeAction({ model: model })
    );
  }

  fetchAllExpenseCodes() {
    this.dispatch(fromAllActions.fetchAllExpenseCodes());
  }

  dispatch(action: Action) {
    this._store.dispatch(action);
  }
}
