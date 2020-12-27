import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { Action, createReducer, on } from "@ngrx/store";
import { CustomFieldDefinationModel } from "@shared/service-proxies/service-proxies";
import { CustomFieldsState } from "./custom.fields.state";
import * as fromAllActions from "./custom.fields.actions";

export const customFieldsStoreFeatureKey = "customFields";

export function selectDefinationId(a: CustomFieldDefinationModel): string {
  return a.definationId.toString();
}

export const customFieldsAdapter: EntityAdapter<CustomFieldDefinationModel> = createEntityAdapter<CustomFieldDefinationModel>(
  {
    selectId: selectDefinationId,
  }
);

const customFieldsInitialState: CustomFieldsState = customFieldsAdapter.getInitialState(
  {
    isBusy: false,
    items: [],
    success: false,
    errors: [],
    entityTypes: [],
    fieldTypes: [],
    selectedEntityType: null,
  }
);
const createFeatureReducer = createReducer(
  customFieldsInitialState,
  on(fromAllActions.fetchCustomFieldTypesCompletedAction, (state, props) => ({
    ...state,
    entityTypes: props.entityTypes,
    fieldTypes: props.fieldTypes,
    isBusy: false,
  })),
  on(fromAllActions.setSelectedEntityType, (state, props) => ({
    ...state,
    selectedEntityType: props.entityType,
  }))
);
export function reducer(state: CustomFieldsState | undefined, action: Action) {
  return createFeatureReducer(state, action);
}
