import { createAction, props } from "@ngrx/store";
import { CompanyDetailsModel } from "@shared/service-proxies/service-proxies";

export const loadCompanyDetailsAction = createAction(
  "[Company] Load Copmany Details"
);
export const companyDetailsLoadedAction = createAction(
  "[Company] Details Loaded",
  props<{ details: CompanyDetailsModel }>()
);
export const uiStateBusyAction = createAction(
  "[Company] UI State Busy",
  props<{ isBusy: boolean }>()
);
export const errorsStateAction = createAction(
  "[Company] On Errors",
  props<{ errors: string[] }>()
);
