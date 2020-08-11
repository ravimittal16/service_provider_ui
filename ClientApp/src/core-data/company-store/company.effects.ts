import { createEffect, Actions, ofType } from "@ngrx/effects";
import { BaseEffect } from "@core-data/base.effect";
import { Injectable } from "@angular/core";
import * as fromCompanyActions from "./company.actions";
import { CompanyServiceProxy } from "@shared/service-proxies/service-proxies";
import { switchMap, mergeMap, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class CompanyStoreEffects extends BaseEffect {
  constructor(
    private companyService: CompanyServiceProxy,
    private actions$: Actions
  ) {
    super();
  }
  loadCompanyDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromCompanyActions.loadCompanyDetailsAction),
      mergeMap((action) =>
        this.companyService.getCompanyDetails().pipe(
          switchMap((response) => {
            console.log(response);
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
