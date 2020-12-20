import { createAction, props } from "@ngrx/store";
import {
  CompanyDetailsModel,
  CommonDataModel,
  SubscribedFeaturesDto,
  ActionReturnCode,
} from "@shared/service-proxies/service-proxies";

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
export const loadCommonDataAction = createAction("[Company] Load Common Data");

export const commonDataLoadedAction = createAction(
  "[Company] Common Data Loaded",
  props<{ commonData: CommonDataModel }>()
);
// ==========================================================
// COMPANY FEATURES
// ==========================================================

export const updateFeatureSubscriptionAction = createAction(
  "[Company] Update feature subscription action",
  props<{ featureId: number; isActive: boolean }>()
);
export const updateFeatureSubscriptionCompletedAction = createAction(
  "[Company] Update feature subscription completed action",
  props<{ returnCode: ActionReturnCode }>()
);

export const loadCompanySubscribedFeatues = createAction(
  "[Company] Load Subscribed Featues",
  props<{ companyId: number }>()
);
export const companySubscribedFeaturesLoaded = createAction(
  "[Company] Subscribed Features Loaded",
  props<{ features: SubscribedFeaturesDto[] }>()
);
// ==========================================================
// JOB FORMS
// ==========================================================
