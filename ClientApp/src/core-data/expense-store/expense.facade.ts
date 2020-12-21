import { Injectable } from "@angular/core";
import { Facade } from "@core-data/iFacade";
import { Action, Store } from "@ngrx/store";
import { ExpenseCodeModel } from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";
import { ExpenseState } from "./expense.state";
import * as fromAllActions from "./expense.actions";

@Injectable({
  providedIn: "root",
})
export class ExpenseFacade implements Facade {
  errors$: Observable<string[]>;
  isBusy$: Observable<boolean>;
  expenseCodes$: Observable<ExpenseCodeModel[]>;
  constructor(private _store: Store<ExpenseState>) {}

  addUpdateExpenseCode(model: ExpenseCodeModel) {
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
