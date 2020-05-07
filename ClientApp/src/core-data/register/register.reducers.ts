import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { RegisterModel } from "@shared/service-proxies/service-proxies";
import {
  RegisterActions,
  AccountRegisterActionTypes,
} from "./register.actions";

// ==========================================================
// Creating entity adapter
// ==========================================================
export interface AccountRegisterState extends EntityState<RegisterModel> {
  isSuccess: false;
  errorState: false;
}

export const adapter: EntityAdapter<RegisterModel> = createEntityAdapter<
  RegisterModel
>();
export const initialRegisterState: AccountRegisterState = adapter.getInitialState(
  {
    isSuccess: false,
    errorState: false,
  }
);

export function accountRegisterReducer(
  state = initialRegisterState,
  action
): AccountRegisterState {
  switch (action.type) {
    case AccountRegisterActionTypes.AccountRegisterCompleted:
      break;
    default:
      return state;
  }
}
