import { createAction, props } from "@ngrx/store";
import {
  CustomFieldEntityType,
  CustomFieldType,
} from "@shared/service-proxies/service-proxies";

export const uiStateBusyAction = createAction(
  "[Custom Fields] UI State Busy",
  props<{ isBusy: boolean }>()
);

export const updateErrorStateAction = createAction(
  "[Custom Fields] Error state",
  props<{ errors: string[] }>()
);

export const fetchCustomFieldTypesAction = createAction(
  "[Custom Fields] Fetch Custom Field Types Action"
);
export const fetchCustomFieldTypesCompletedAction = createAction(
  "[Custom Fields] Fetch Custom Field Types Completed Action",
  props<{
    entityTypes: CustomFieldEntityType[];
    fieldTypes: CustomFieldType[];
  }>()
);
export const setSelectedEntityType = createAction(
  "[Custom Fields] Set selected entity type.",
  props<{ entityType: CustomFieldEntityType }>()
);
