import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { createAction, props } from "@ngrx/store";
import {
  CustomFieldDefinationModel,
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
// ==========================================================
// ADD UPDATE CUSTOM FIELD
// ==========================================================
export const addUpdateCustomFieldAction = createAction(
  "[Custom Fields] Add update custom field action",
  props<{ model: CustomFieldDefinationModel; modal: NgbActiveModal }>()
);
export const addUpdateCustomFieldCompletedAction = createAction(
  "[Custom Fields] Add update custom field completed action",
  props<{ entity: any; isSuccess: boolean; isForAdd: boolean }>()
);
