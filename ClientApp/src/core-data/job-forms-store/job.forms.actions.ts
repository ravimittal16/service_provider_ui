import { createAction, props } from "@ngrx/store";
import { JobFormDefinationDto } from "@shared/service-proxies/service-proxies";
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
