import { Action } from "@ngrx/store";
import {
  RegisterModel,
  RegisterModelGenericResponse,
} from "@shared/service-proxies/service-proxies";

export enum AccountRegisterActionTypes {
  AccountRegisterAction = "[Account.Register] Triggered",
  AccountRegisterUiBusy = "[Account.Register] Busy",
  AccountRegisterUiIdle = "[Account.Register] Idle",
  AccountRegisterSuccess = "[Account.Register] Success",
  AccountRegisterError = "[Account.Register] Error",
  LoadExternalSignupInfoAction = "[Account.Register] Load External Signup Info",
  ExternalSignupInfoLoadedAction = "[Account.Register] External Signup Info Loaded",
}

export class AccountRegisterAction implements Action {
  readonly type = AccountRegisterActionTypes.AccountRegisterAction;
  constructor(public payload: RegisterModel) {}
}

export class AccountRegisterSuccessAction implements Action {
  readonly type = AccountRegisterActionTypes.AccountRegisterSuccess;
  constructor(
    public payload: {
      model: RegisterModel;
      output: RegisterModelGenericResponse;
    }
  ) {}
}

export class AccountRegisterErrorAction implements Action {
  readonly type = AccountRegisterActionTypes.AccountRegisterError;
  constructor(
    public payload: {
      model: RegisterModel;
      errors: string[];
    }
  ) {}
}

export class AccountRegisterUiIdleAction implements Action {
  readonly type = AccountRegisterActionTypes.AccountRegisterUiIdle;
}

export class AccountRegisterUiBusyAction implements Action {
  readonly type = AccountRegisterActionTypes.AccountRegisterUiBusy;
}

export class LoadExternalSignupInfoAction implements Action {
  readonly type = AccountRegisterActionTypes.LoadExternalSignupInfoAction;
  constructor(
    public payload: {
      signupKey: string;
    }
  ) {}
}
export class ExternalSignupInfoLoadedAction implements Action {
  readonly type = AccountRegisterActionTypes.ExternalSignupInfoLoadedAction;
  constructor(
    public payload: {
      model: RegisterModel;
    }
  ) {}
}

export type RegisterActions =
  | AccountRegisterAction
  | AccountRegisterSuccessAction
  | AccountRegisterErrorAction
  | AccountRegisterUiIdleAction
  | AccountRegisterUiBusyAction
  | LoadExternalSignupInfoAction
  | ExternalSignupInfoLoadedAction;
