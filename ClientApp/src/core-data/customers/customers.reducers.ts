import { on, createReducer, Action } from "@ngrx/store";
import * as customerActions from "./customers.actions";
import {
  CustomerDto,
  CreateCustomerModel,
} from "@shared/service-proxies/service-proxies";
import { CustomerState } from "./customers.state";
import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export const adapter: EntityAdapter<CustomerDto> = createEntityAdapter<
  CustomerDto
>();

export const initialState: CustomerState = adapter.getInitialState({
  companyId: 0,
  model: null,
  isBusy: false,
  errors: [],
  success: false,
});

const customerReducer = createReducer(
  initialState,
  on(customerActions.openCreateModalAction, (state) => ({
    ...state,
    prop: 1,
  })),
  on(customerActions.customersLoadedAction, (state: CustomerState, props) =>
    adapter.addMany(props.customers, state)
  )
);

export function reducer(state: CustomerState | undefined, action: Action) {
  return customerReducer(state, action);
}