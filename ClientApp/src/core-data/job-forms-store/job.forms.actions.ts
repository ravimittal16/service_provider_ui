import { createAction, props } from "@ngrx/store";
import {
  JobFormDefinationDto,
  JobFormModel,
  JobFormModelGenericResponse,
} from "@shared/service-proxies/service-proxies";
export const uiStateBusyAction = createAction(
  "[JobForms] UI State Busy",
  props<{ isBusy: boolean }>()
);
export const loadAllJobFormDefinationAction = createAction(
  "[JobForms] Load All Definations"
);
export const allJobFormDefinationsLoadedAction = createAction(
  "[JobForms] All Definations Loaded",
  props<{ definations: JobFormDefinationDto[] }>()
);
export const updateErrorStateAction = createAction(
  "[JobForms] Error state",
  props<{ errors: string[] }>()
);
// ==========================================================
// CREATE JOB FORM ACTIONS
// ==========================================================
export const createJobFormAction = createAction(
  "[JobForms] Create JobForm Event",
  props<{ model: JobFormModel }>()
);
export const createJobFormCompletedAction = createAction(
  "[JobForms] Create JobForm Completed Action",
  props<{ response: JobFormModelGenericResponse; isSuccess: boolean }>()
);
// ==========================================================
// DELETE JOB FORM ACTION
// ==========================================================
export const deleteJobFormDefinationAction = createAction(
  "[JobForms] Delete Job Form Defination Action",
  props<{ jobFormId: number }>()
);
export const onDeleteJobFormDefinationCompletedAction = createAction(
  "[JobForms] Delete Job Form Defination Completed Action",
  props<{ jobFormId: number; isSuccess: boolean }>()
);
// ==========================================================
// FETCH JOB FORM DETAILS ACTIONS
// ==========================================================
export const fetchFormDetailsAction = createAction(
  "[JobForms] Fetch Job Form details action.",
  props<{ formId: number }>()
);
