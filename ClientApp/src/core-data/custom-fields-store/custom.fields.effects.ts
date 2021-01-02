import { Injectable } from "@angular/core";
import { BaseEffect } from "@core-data/base.effect";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { CustomFieldsServiceProxy } from "@shared/service-proxies/service-proxies";
import { CustomFieldsState } from "./custom.fields.state";
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from "rxjs/operators";
import * as fromAllActions from "./custom.fields.actions";
import * as fromAllSelectors from "./custom.fields.selectors";
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CustomFieldsStoreEffects extends BaseEffect {
  constructor(
    private _store: Store<CustomFieldsState>,
    private dataService: CustomFieldsServiceProxy,
    private actions$: Actions
  ) {
    super();
  }

  addUpdateCustomField$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAllActions.addUpdateCustomFieldAction),
      mergeMap((action) =>
        this.dataService.addUpdateCustomField(action.model).pipe(
          map((data) => {
            if (data.isSuccess && action.modal) {
              action.modal.close(data.isSuccess);
            }
            return fromAllActions.addUpdateCustomFieldCompletedAction({
              entity: data.entity,
              isSuccess: data.isSuccess,
              isForAdd: action.model.definationId === 0,
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

  fetchAllCustomFieldsByEntityType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAllActions.fetchCustomFieldsByEntityTypeAction),
      mergeMap((action) =>
        this.dataService.getAllCustomFieldDefinations(action.entityType).pipe(
          map((res) =>
            fromAllActions.fetchCustomFieldsByEntityTypeCompletedAction({
              customFields: res,
            })
          )
        )
      )
    );
  });

  fetchAllEntityTypesAndFieldTypes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAllActions.fetchCustomFieldTypesAction),
      withLatestFrom(
        this._store.select(fromAllSelectors.selectCustomFieldsEntityTypes)
      ),
      filter(([action, commonData]) => {
        return Object.keys(commonData).length === 0;
      }),
      mergeMap((action) =>
        this.dataService.getAllCustomFieldTypes().pipe(
          map((res) =>
            fromAllActions.fetchCustomFieldTypesCompletedAction({
              entityTypes: res.customFieldEntityTypes,
              fieldTypes: res.customFieldTypes,
            })
          )
        )
      )
    );
  });
}
