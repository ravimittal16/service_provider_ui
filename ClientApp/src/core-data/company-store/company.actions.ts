import { createAction, props } from "@ngrx/store";
import { CompanyDetailsModel } from "@shared/service-proxies/service-proxies";

export const loadCompanyDetailsAction = createAction(
  "[Company] Load Copmany Details"
);
export const companyDetailsLoadedAction = createAction(
  "[Company] Details Loaded",
  props<{ details: CompanyDetailsModel }>()
);
