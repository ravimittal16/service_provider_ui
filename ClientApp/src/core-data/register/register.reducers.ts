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
  model: RegisterModel;
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
    model: null,
  }
);

export function accountRegisterReducer(
  state = initialRegisterState,
  action
): AccountRegisterState {
  switch (action.type) {
    case AccountRegisterActionTypes.AccountRegisterSuccess:
      return Object.assign({ ...state, isSuccess: true });
    case AccountRegisterActionTypes.AccountRegisterError:
      return Object.assign({
        ...state,
        errors: action.payload.errors,
        isSuccess: false,
      });
    case AccountRegisterActionTypes.AccountRegisterUiBusy:
      return { ...state, busyState: true };
    case AccountRegisterActionTypes.AccountRegisterUiIdle:
      return Object.assign({ ...state, busyState: false });
    case AccountRegisterActionTypes.ExternalSignupInfoLoadedAction:
      return { ...state, model: action.payload };
    default:
      return state;
  }
}
