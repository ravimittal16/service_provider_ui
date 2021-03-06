import { Injectable } from "@angular/core";
import { BaseEffect } from "@core-data/base.effect";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import {
  CustompricingServiceProxy,
  PricingGroupCustomerModel,
} from "@shared/service-proxies/service-proxies";
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

  addUpdatePricingGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAllActions.addUpdatePricingGrpup),
      mergeMap((action) =>
        this._dataService.addUpdatePricingGroup(action.model).pipe(
          map((data) => {
            if (data.isSuccess && action.modal) {
              action.modal.close(data.isSuccess);
            }
            return fromAllActions.addUpdatePricingGrpupCompletedAction({
              entity: data.entity,
              success: data.isSuccess,
              isFromAdd: action.model.pricingGroupId === 0,
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

  addUpdateCustomerToPricingGroupAction$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAllActions.addUpdateCustomerToPricingGroupAction),
      mergeMap((action) => {
        const __model = {
          customerId: action.customerId,
          pricingGroupId: action.pricingGroupId,
        } as PricingGroupCustomerModel;
        return this._dataService.addCustomerToPricingGroup(__model).pipe(
          map((data) =>
            fromAllActions.addUpdateCustomerToPricingGroupCompletedAction({
              isSuccess: data.isSuccess,
              response: data,
            })
          ),
          catchError((error) => {
            return this.parseErrorWithAction(error).pipe(
              switchMap((error) => {
                return of(
                  fromAllActions.updateErrorStateAction({
                    errors: Array.isArray(error) ? [...error] : [error],
                  })
                );
              })
            );
          })
        );
      })
    );
  });

  deleteCustomerFromPricingAction$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAllActions.deleteCustomerFromPricingGroupAction),
      mergeMap((action) =>
        this._dataService
          .deleteCustomerFromPricing(action.customerId, action.pricingGroupId)
          .pipe(
            map((data) =>
              fromAllActions.deleteCustomerFromPricingGroupCompletedAction({
                isSuccess: data.isSuccess,
                actionReturnCode: data.returnCode,
                pricingGroupId: action.pricingGroupId,
                customerId: action.customerId,
              })
            ),
            catchError((error) => {
              return this.parseErrorWithAction(error).pipe(
                switchMap((error) => {
                  return of(
                    fromAllActions.updateErrorStateAction({
                      errors: Array.isArray(error) ? [...error] : [error],
                    })
                  );
                })
              );
            })
          )
      )
    );
  });
  deleteProductFromPricingAction$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAllActions.deleteProductFromPricingAction),
      mergeMap((action) =>
        this._dataService
          .deleteProductFromPricing(action.pricingId, action.pricingGroupId)
          .pipe(
            map((data) =>
              fromAllActions.deleteProductFromPricingCompletedAction({
                isSuccess: data.isSuccess,
                pricingId: action.pricingId,
                returnCode: data.returnCode,
                forGroupPricing: (action.pricingGroupId ?? 0) !== 0,
              })
            ),
            catchError((error) => {
              return this.parseErrorWithAction(error).pipe(
                switchMap((error) => {
                  return of(
                    fromAllActions.updateErrorStateAction({
                      errors: Array.isArray(error) ? [...error] : [error],
                    })
                  );
                })
              );
            })
          )
      )
    );
  });

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
              forGroupPricing: action.model?.pricingGroupId > 0,
            });
          }),
          catchError((error) => {
            return this.parseErrorWithAction(error).pipe(
              switchMap((error) => {
                return of(
                  fromAllActions.updateErrorStateAction({
                    errors: Array.isArray(error) ? [...error] : [error],
                  })
                );
              })
            );
          })
        )
      )
    );
  });

  fetchPricingGroupDetailsAction$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAllActions.fetchPricingGroupDetailsAction),
      mergeMap((action) =>
        this._dataService.pricingGroupDetail(action.pricingGroupId).pipe(
          map((res) =>
            fromAllActions.fetchPricingGroupDetailCompletedAction({
              details: res.entity,
            })
          )
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
        this._dataService.allIndividualPricingList().pipe(
          map((res) =>
            fromAllActions.onFetchAllIndividualPricingListCompletedAction({
              list: res,
            })
          )
        )
      )
    );
  });

  fetchAllPricingGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAllActions.fetchAllPricingGrpupsAction),
      withLatestFrom(
        this._store.select(fromAllSelectors.selectAllPricingGroupsList)
      ),
      filter(([action, commonData]) => {
        return Object.keys(commonData).length === 0;
      }),
      mergeMap((action) =>
        this._dataService.allPricingGroups().pipe(
          map((res) =>
            fromAllActions.fetchAllPricingGroupCompletedAction({
              groups: res,
            })
          )
        )
      )
    );
  });
}
