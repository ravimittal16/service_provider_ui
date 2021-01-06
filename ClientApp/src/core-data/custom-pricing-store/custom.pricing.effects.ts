import { Injectable } from "@angular/core";
import { BaseEffect } from "@core-data/base.effect";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { CustompricingServiceProxy } from "@shared/service-proxies/service-proxies";
import { of } from "rxjs";
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from "rxjs/operators";
import * as fromAllActions from "./custom.pricing.actions";
import * as fromAllSelectors from "./custom.pricing.selectors";
import { CustomPricingStoreState } from "./custom.pricing.state";

@Injectable({ providedIn: "root" })
export class CustomPricingEffects extends BaseEffect {
  constructor(
    private _store: Store<CustomPricingStoreState>,
    private _dataService: CustompricingServiceProxy,
    private actions$: Actions
  ) {
    super();
  }

  addUpdateIndividualPricing$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAllActions.addUpdateIndividualPricing),
      mergeMap((action) =>
        this._dataService.addUpdateIndividualPricing(action.model).pipe(
          map((data) => {
            if (data.isSuccess && action.modal) {
              action.modal.close(data.isSuccess);
            }
            return fromAllActions.addUpdateIndividualPricingCompletedAction({
              entity: data.entity,
              success: data.isSuccess,
              isFromAdd: action.model.pricingId === 0,
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

  fetchAllIndividualPricingList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAllActions.fetchAllIndividualPricingListAction),
      withLatestFrom(
        this._store.select(fromAllSelectors.selectAllIndividualPricingList)
      ),
      filter(([action, commonData]) => {
        return Object.keys(commonData).length === 0;
      }),
      mergeMap((action) =>
        this._dataService.getAllIndividualPricingList().pipe(
          map((res) =>
            fromAllActions.onFetchAllIndividualPricingListCompletedAction({
              list: res,
            })
          )
        )
      )
    );
  });
}
