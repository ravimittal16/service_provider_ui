import { Injectable } from "@angular/core";
import { Facade } from "@core-data/iFacade";
import { Action, select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { CustomFieldsState } from "./custom.fields.state";
import * as fromAllActions from "./custom.fields.actions";
import * as fromAllSelectors from "./custom.fields.selectors";
import {
  CustomFieldEntityType,
  CustomFieldType,
} from "@shared/service-proxies/service-proxies";

@Injectable({ providedIn: "root" })
export class CustomFieldsFacade implements Facade {
  errors$: Observable<string[]>;
  isBusy$: Observable<boolean>;
  entityTypes$: Observable<CustomFieldEntityType[]>;
  fieldTypes$: Observable<CustomFieldType[]>;
  selectedEntityType$: Observable<CustomFieldEntityType>;
  constructor(private _store: Store<CustomFieldsState>) {
    this.entityTypes$ = this._store.pipe(
      select(fromAllSelectors.selectCustomFieldsEntityTypes)
    );
    this.fieldTypes$ = this._store.pipe(
      select(fromAllSelectors.selectCustomFieldsTypes)
    );
    this.selectedEntityType$ = this._store.pipe(
      select(fromAllSelectors.selectSelectedEntityType)
    );
  }

  private _setBusy(isBusy: boolean) {
    this.dispatch(fromAllActions.uiStateBusyAction({ isBusy: isBusy }));
  }

  setSelectedEntityType(entityType: CustomFieldEntityType) {
    this.dispatch(
      fromAllActions.setSelectedEntityType({ entityType: entityType })
    );
  }

  fetchAllEntityTypesAndFieldTypes() {
    this._setBusy(true);
    this.dispatch(fromAllActions.fetchCustomFieldTypesAction());
  }

  dispatch(action: Action) {
    this._store.dispatch(action);
  }
}
