import { on, createReducer, State, Action } from "@ngrx/store";
import * as customerActions from "./actions";

export interface CustomerState {
  model: any;
  isBusy: boolean;
  errors: [];
  success: boolean;
}

export const initialState: CustomerState = {
  model: null,
  isBusy: false,
  errors: [],
  success: false,
};

const customerReducer = createReducer(
  initialState,
  on(customerActions.openCreateModalAction, (state) => ({
    ...state,
    prop: 1,
  }))
);

export function reducer(state: CustomerState | undefined, action: Action) {
  return customerReducer(state, action);
}
