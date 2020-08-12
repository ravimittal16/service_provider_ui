import { createEffect, Actions, ofType } from "@ngrx/effects";
import { BaseEffect } from "@core-data/base.effect";
import { Injectable } from "@angular/core";
import * as fromCompanyActions from "./company.actions";
import * as fromCompanySelectors from "./company.selectors";
import { CompanyServiceProxy } from "@shared/service-proxies/service-proxies";
import {
  switchMap,
  catchError,
  withLatestFrom,
  concatMap,
  filter,
} from "rxjs/operators";
import { of } from "rxjs";
import { CompanyState } from "./company.state";
import { Store } from "@ngrx/store";

@Injectable()
export class CompanyStoreEffects extends BaseEffect {
  constructor(
    private _store: Store<CompanyState>,
    private companyService: CompanyServiceProxy,
    private actions$: Actions
  ) {
    super();
  }
  loadCompanyDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromCompanyActions.loadCompanyDetailsAction),
      withLatestFrom(
        this._store.select(fromCompanySelectors.selectCompanyDetails)
      ),
      filter(([action, details]) => {
        return details === null;
      }),
      concatMap((action) =>
        this.companyService.getCompanyDetails().pipe(
          switchMap((response) => {
            return [
              fromCompanyActions.uiStateBusyAction({ isBusy: false }),
              fromCompanyActions.companyDetailsLoadedAction({
                details: response,
              }),
            ];
          }),
          catchError((error) => {
            return this.parseErrorWithAction(error).pipe(
              switchMap((error) => {
                return of(
                  fromCompanyActions.errorsStateAction({
                    errors: [error],
                  })
                );
              })
            );
          })
        )
      )
    );
  });
}
