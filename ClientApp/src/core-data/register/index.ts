import * as fromAccountRegister from "./register.reducers";
import { ActionReducerMap } from "@ngrx/store";

export interface AppState {
  accountRegister: fromAccountRegister.AccountRegisterState;
}

export const accountReducers: ActionReducerMap<AppState> = {
  accountRegister: fromAccountRegister.accountRegisterReducer,
};
