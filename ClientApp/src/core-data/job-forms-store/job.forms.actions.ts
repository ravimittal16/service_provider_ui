import { createAction, props } from "@ngrx/store";
import {
  ActionReturnCode,
  JobFormDefinationDto,
  JobFormModel,
  JobFormModelGenericResponse,
} from "@shared/service-proxies/service-proxies";
import { JobFormsActionListenerSchema } from "./job.forms.state";
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
export const deleteJobFormSectionAction = createAction(
  "[JobForms] Delete Job Form Section Action",
  props<{ sectionId: number }>()
);
export const deleteJobFormSectionCompletedAction = createAction(
  "[JobForms] Delete Job Form Section Action Completed",
  props<{ sectionId: number; isSuccess: boolean }>()
);
// ==========================================================
// FETCH JOB FORM DETAILS ACTIONS
// ==========================================================
export const fetchFormDetailsAction = createAction(
  "[JobForms] Fetch Job Form details action.",
  props<{ formId: number }>()
);
export const formDetailsFetchedAction = createAction(
  "[JobForms] Form details fetch completed action.",
  props<{ details: JobFormModel; isSuccess: boolean; formId: number }>()
);
export const clearFormDetailsAction = createAction(
  "[JobForms] Clear Job Form details action."
);
export const eventCompleteListenerAction = createAction(
  "[JobForms] Actions Completed",
  props<{
    payload: JobFormsActionListenerSchema;
  }>()
);
// ==========================================================
// ATTACH JOB FORM TO JOB
// ==========================================================
export const attachJobFormToJobAction = createAction(
  "[JobForms] Attach Job Form to Job",
  props<{ formId: number; jobId: number }>()
);
export const attachJobFormToJobCompletedAction = createAction(
  "[JobForms] Attach Job Form to Job Completed Action",
  props<{
    errors: string[];
    isSuccess: boolean;
    returnCode?: ActionReturnCode;
  }>()
);
