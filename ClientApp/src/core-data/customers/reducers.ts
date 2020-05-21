import { on, createReducer, Action } from "@ngrx/store";
import * as customerActions from "./actions";
import {
  CustomerDto,
  CreateCustomerModel,
} from "@shared/service-proxies/service-proxies";

export interface CustomerState {
  customers: CustomerDto[];
  model: CreateCustomerModel;
  isBusy: boolean;
  errors: [];
  companyId: number;
  success: boolean;
}

export const initialState: CustomerState = {
  customers: [],
  companyId: 0,
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
  })),
  on(customerActions.customersLoadedAction, (state: CustomerState, props) => ({
    ...state,
    customers: props.customers,
  }))
);

export function reducer(state: CustomerState | undefined, action: Action) {
  return customerReducer(state, action);
}
