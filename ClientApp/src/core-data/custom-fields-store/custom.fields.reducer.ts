import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { Action, createReducer, on } from "@ngrx/store";
import { CustomFieldDto } from "@shared/service-proxies/service-proxies";
import { CustomFieldsState } from "./custom.fields.state";
import * as fromAllActions from "./custom.fields.actions";
import { adapter } from "@core-data/register/register.reducers";

export const customFieldsStoreFeatureKey = "customFields";

export function selectDefinationId(a: CustomFieldDto): string {
  return a.definationId.toString();
}

export const customFieldsAdapter: EntityAdapter<CustomFieldDto> = createEntityAdapter<CustomFieldDto>(
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
  on(
    fromAllActions.fetchCustomFieldsByEntityTypeCompletedAction,
    (state, props) => {
      const _newState = customFieldsAdapter.addMany(props.customFields, state);
      return {
        ..._newState,
        isBusy: false,
      };
    }
  ),

  on(fromAllActions.setSelectedEntityType, (state, props) => ({
    ...state,
    selectedEntityType: props.entityType,
  }))
);
export function reducer(state: CustomFieldsState | undefined, action: Action) {
  return createFeatureReducer(state, action);
}
