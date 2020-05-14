import { Action } from "@ngrx/store";
import {
  RegisterModel,
  RegisterModelGenericResponse,
} from "@shared/service-proxies/service-proxies";

export enum AccountRegisterActionTypes {
  AccountRegister = "[Account.Register] Triggered",
  AccountRegisterUiBusy = "[Account.Register] Busy",
  AccountRegisterUiIdle = "[Account.Register] Idle",
  AccountRegisterSuccess = "[Account.Register] Success",
  AccountRegisterError = "[Account.Register] Error",
}

export class AccountRegisterAction implements Action {
  readonly type = AccountRegisterActionTypes.AccountRegister;
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

export type RegisterActions =
  | AccountRegisterAction
  | AccountRegisterSuccessAction
  | AccountRegisterErrorAction
  | AccountRegisterUiIdleAction
  | AccountRegisterUiBusyAction;
