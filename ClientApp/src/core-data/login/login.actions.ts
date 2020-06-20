import { createAction, props } from "@ngrx/store";
import {
  AuthenticateResultModel,
  AuthenticateModel,
} from "@shared/service-proxies/service-proxies";

export const loginTrigger = createAction(
  "[Login] Login Trigger",
  props<{ payload: AuthenticateModel }>()
);

export const loginAuthTokenSaved = createAction(
  "[Login] Auth Token Saved",
  props<{ payload: AuthenticateResultModel }>()
);

export const loginRunningAction = createAction(
  "[Login] Login Running",
  props<{ payload: boolean }>()
);

export const loginCompletedAction = createAction("[Login] Login Completed");

export const loginFailure = createAction(
  "[Login] Login Failure",
  props<{ payload: any }>()
);

export const loginSuccess = createAction(
  "[Login] Login Success",
  props<{ payload: AuthenticateResultModel }>()
);
