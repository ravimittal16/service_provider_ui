import { createEntityAdapter, EntityAdapter, Update } from "@ngrx/entity";
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
    customFields: [],
    totalCustomFields: 0,
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
      let finalState = customFieldsAdapter.removeAll(state);
      finalState = customFieldsAdapter.addMany(props.customFields, finalState);
      return {
        ...finalState,
        isBusy: false,
        totalCustomFields: props.customFields.length,
        customFields: props.customFields,
      };
    }
  ),
  on(fromAllActions.addUpdateCustomFieldCompletedAction, (state, props) => {
    let finalState = state;
    if (props.isForAdd) {
      finalState = customFieldsAdapter.addOne(props.entity, state);
      finalState.totalCustomFields = state.totalCustomFields + 1;
    } else {
      const editSubmission: Update<CustomFieldDto> = {
        id: props.entity.definationId,
        changes: {
          label: props.entity.label,
          isRequired: props.entity.isRequired,
          defaultValue: props.entity.defaultValue,
          defaultValue2: props.entity.defaultValue2,
          valueType: props.entity.valueType,
          fieldName: props.entity.fieldName,
          customFieldTypeId: props.entity.customFieldTypeId,
        },
      };
      finalState = customFieldsAdapter.updateOne(editSubmission, finalState);
    }
    return {
      ...finalState,
      isBusy: false,
    };
  }),
  on(fromAllActions.deleteCustomFieldCompletedAction, (state, props) => {
    let finalState = state;
    if (props.isSuccess) {
      finalState = customFieldsAdapter.removeOne(
        props.definationId,
        finalState
      );
    }
    return {
      ...finalState,
      isBusy: false,
    };
  }),
  on(fromAllActions.setSelectedEntityType, (state, props) => ({
    ...state,
    selectedEntityType: props.entityType,
  }))
);
export function reducer(state: CustomFieldsState | undefined, action: Action) {
  return createFeatureReducer(state, action);
}
