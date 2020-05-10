import { Action } from "@ngrx/store";
import {
  RegisterModel,
  RegisterModelGenericResponse,
} from "@shared/service-proxies/service-proxies";

export enum AccountRegisterActionTypes {
  AccountRegister = "[Account.Register] Triggered",
  AccountRegisterCompleted = "[Account.Register] Completed",
  AccountRegisterError = "[Account.Register] Error",
}

export class AccountRegisterAction implements Action {
  readonly type = AccountRegisterActionTypes.AccountRegister;
  constructor(public payload: RegisterModel) {}
}

export class AccountRegisterCompletedAction implements Action {
  readonly type = AccountRegisterActionTypes.AccountRegisterCompleted;
  constructor(
    public payload: {
      model: RegisterModel;
      output: RegisterModelGenericResponse;
    }
  ) {}
}

export type RegisterActions =
  | AccountRegisterAction
  | AccountRegisterCompletedAction;
