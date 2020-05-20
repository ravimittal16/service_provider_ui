import { createAction, props } from "@ngrx/store";
import {
  AuthenticateResultModel,
  AuthenticateModel,
} from "@shared/service-proxies/service-proxies";
export const loginSuccess = createAction(
  "[Login] Login Success",
  props<{ payload: AuthenticateResultModel }>()
);
export const loginTrigger = createAction(
  "[Login] Login Trigger",
  props<{ payload: AuthenticateModel }>()
);

export const loginFailure = createAction(
  "[Login] Login Failure",
  props<{ payload: any }>()
);
