import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { RegisterModel } from "@shared/service-proxies/service-proxies";
import { AccountRegisterActionTypes } from "./register.actions";

// ==========================================================
// Creating entity adapter
// ==========================================================
export interface AccountRegisterState extends EntityState<RegisterModel> {
  isSuccess: boolean;
  busyState: boolean;
  errorState: boolean;
  errors: [];
}

export const adapter: EntityAdapter<RegisterModel> = createEntityAdapter<
  RegisterModel
>();
export const initialRegisterState: AccountRegisterState = adapter.getInitialState(
  {
    busyState: false,
    isSuccess: false,
    errorState: false,
    errors: [],
  }
);

export function accountRegisterReducer(
  state = initialRegisterState,
  action
): AccountRegisterState {
  switch (action.type) {
    case AccountRegisterActionTypes.AccountRegisterSuccess:
      return Object.assign({ ...state, isSuccess: true });
      break;
    case AccountRegisterActionTypes.AccountRegisterError:
      return Object.assign({
        ...state,
        errors: action.payload.errors,
        isSuccess: false,
      });
      break;
    case AccountRegisterActionTypes.AccountRegisterUiBusy:
      return Object.assign({ ...state, busyState: true });
      break;
    case AccountRegisterActionTypes.AccountRegisterUiIdle:
      return Object.assign({ ...state, busyState: false });
      break;
    default:
      return state;
  }
}
// ==========================================================
// Working with Selectors
// ==========================================================
