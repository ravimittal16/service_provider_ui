import { Injectable } from "@angular/core";
import { BaseEffect } from "@core-data/base.effect";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { CustomFieldsServiceProxy } from "@shared/service-proxies/service-proxies";
import { CustomFieldsState } from "./custom.fields.state";
import { filter, map, mergeMap, withLatestFrom } from "rxjs/operators";
import * as fromAllActions from "./custom.fields.actions";
import * as fromAllSelectors from "./custom.fields.selectors";

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
