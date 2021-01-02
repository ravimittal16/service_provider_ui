import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  customFieldsAdapter,
  customFieldsStoreFeatureKey,
} from "./custom.fields.reducer";
import { CustomFieldsState } from "./custom.fields.state";

export const customFieldsState = createFeatureSelector<CustomFieldsState>(
  customFieldsStoreFeatureKey
);

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = customFieldsAdapter.getSelectors();

export const selectAllErrors = createSelector(
  customFieldsState,
  (state) => state.errors
);
export const selectCustomFieldsEntityTypes = createSelector(
  customFieldsState,
  (state: CustomFieldsState) => state.entityTypes
);
export const selectCustomFieldsTypes = createSelector(
  customFieldsState,
  (state: CustomFieldsState) => state.fieldTypes
);
export const selectSelectedEntityType = createSelector(
  customFieldsState,
  (state: CustomFieldsState) => state.selectedEntityType
);
export const selectCustomFields = createSelector(customFieldsState, selectAll);

export const hasReachedToMaxLimit = createSelector(customFieldsState, (state) =>
  state.selectedEntityType
    ? state.customFields.length === state.selectedEntityType?.maxFieldsAllowed
    : false
);
