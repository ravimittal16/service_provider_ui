import { Injectable } from "@angular/core";
import { BaseEffect } from "@core-data/base.effect";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { ExpenseServiceProxy } from "@shared/service-proxies/service-proxies";
import { ExpenseState } from "./expense.state";
import * as fromAllSelectors from "./expense.selectors";

import * as fromAllActions from "./expense.actions";
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class ExpenseStoreEffects extends BaseEffect {
  constructor(
    private _store: Store<ExpenseState>,
    private expenseService: ExpenseServiceProxy,
    private actions$: Actions
  ) {
    super();
  }

  addUpdateExpense$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAllActions.triggerAddUpdateExpenseAction),
      withLatestFrom(
        this._store.pipe(select(fromAllSelectors.selectActiveModal))
      ),
      mergeMap(([action, modal]) =>
        this.expenseService.addUpdateExpense(action.model).pipe(
          map((data) => {
            if (data.isSuccess && modal) {
              modal.close(true);
            }
            return fromAllActions.triggerAddUpdateExpenseCompletedAction({
              entity: data.entity,
              isSuccess: data.isSuccess,
              isForAdd: action.model.expenseId === 0,
            });
          }),
          catchError((error) => {
            return this.parseErrorWithAction(error).pipe(
              switchMap((error) => {
                return of(
                  fromAllActions.updateErrorStateAction({
                    errors: [...error],
                  })
                );
              })
            );
          })
        )
      )
    );
  });

  addUpdateExpenseCode$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAllActions.triggerAddUpdateExpenseCodeAction),
      withLatestFrom(
        this._store.pipe(select(fromAllSelectors.selectActiveModal))
      ),
      mergeMap(([action, modal]) =>
        this.expenseService.addUpdateExpenseCode(action.model).pipe(
          map((data) => {
            if (data.isSuccess && modal) {
              modal.close(true);
            }
            return fromAllActions.triggerAddUpdateExpenseCodeCompletedAction({
              entity: data.entity,
              isSuccess: data.isSuccess,
              isAdded: action.model.expenseCodeId === 0,
            });
          }),
          catchError((error) => {
            return this.parseErrorWithAction(error).pipe(
              switchMap((error) => {
                return of(
                  fromAllActions.updateErrorStateAction({
                    errors: [...error],
                  })
                );
              })
            );
          })
        )
      )
    );
  });

  loadAllFormsDefinations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAllActions.fetchAllExpenseCodes),
      withLatestFrom(
        this._store.select(fromAllSelectors.selectAllExpenseCodes)
      ),
      filter(([action, commonData]) => {
        return Object.keys(commonData).length === 0;
      }),
      mergeMap((action) =>
        this.expenseService.getExpenseCodes().pipe(
          map((res) =>
            fromAllActions.fetchAllExpenseCodesCompletedAction({
              codes: res,
            })
          )
        )
      )
    );
  });
}
