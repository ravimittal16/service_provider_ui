import { createAction, props } from "@ngrx/store";
import {
  AuthenticateResultModel,
  AuthenticateModel,
} from "@shared/service-proxies/service-proxies";

export const loginTrigger = createAction(
  "[Auth] Trigger",
  props<{ payload: AuthenticateModel }>()
);

export const loginAuthTokenSaved = createAction(
  "[Auth] Auth Token Saved",
  props<{ payload: AuthenticateResultModel }>()
);

export const loginRunningAction = createAction(
  "[Auth] Running",
  props<{ payload: boolean }>()
);

export const loginCompletedAction = createAction("[Auth] Login Completed");

export const loginFailure = createAction(
  "[Auth] Failure",
  props<{ payload: any }>()
);

export const loginSuccess = createAction(
  "[Auth] Success",
  props<{ payload: AuthenticateResultModel }>()
);

export const checkAuth = createAction("[Auth] check auth");
export const handleRedirectSuccess = createAction(
  "[Auth] redirect",
  props<{ redirectUrl: string }>()
);
