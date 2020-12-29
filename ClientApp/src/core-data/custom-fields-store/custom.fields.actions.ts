import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { createAction, props } from "@ngrx/store";
import {
  CustomFieldDefinationModel,
  CustomFieldDto,
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
  props<{ entity: CustomFieldDto; isSuccess: boolean; isForAdd: boolean }>()
);
// ==========================================================
// CUSTOM FIELDS DTO ACTIONS
// ==========================================================
export const fetchCustomFieldsByEntityTypeAction = createAction(
  "[Custom Fields] Fetch Custom Fields by entity types.",
  props<{ entityType: number }>()
);
export const fetchCustomFieldsByEntityTypeCompletedAction = createAction(
  "[Custom Fields] Fetch Custom Fields by entity types completed.",
  props<{ customFields: CustomFieldDto[] }>()
);
