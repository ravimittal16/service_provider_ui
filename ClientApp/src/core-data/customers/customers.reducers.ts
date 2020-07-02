import { on, createReducer, Action } from "@ngrx/store";
import * as customerActions from "./customers.actions";
import { CustomerDto } from "@shared/service-proxies/service-proxies";
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
  editedCustomerDetails: null,
});

const customerReducer = createReducer(
  initialState,
  on(customerActions.openCreateModalAction, (state) => ({
    ...state,
    prop: 1,
  })),
  on(customerActions.customersLoadedAction, (state, props) => {
    return adapter.addMany(props.customers, state);
  }),
  on(customerActions.editedCustomerDetailsLoaded, (state, props) => ({
    ...state,
    editedCustomerDetails: props.details,
  })),
  on(customerActions.clearPreviousEditedDetails, (state, props) => ({
    ...state,
    editedCustomerDetails: null,
  })),
  on(
    customerActions.createEditCustomerModalDismissedAction,
    (state, props) => ({
      ...state,
      editedCustomerDetails: null,
      errors: [],
    })
  ),
  on(customerActions.openCreateModalAction, (state, props) => ({
    ...state,
    errors: [],
  })),
  on(customerActions.createCustomerErrorAction, (state, props) => ({
    ...state,
    errors: props.errors,
  }))
);

export function reducer(state: CustomerState | undefined, action: Action) {
  return customerReducer(state, action);
}

// ==========================================================
// Customer Adapter Selectors
// ==========================================================
const { selectIds, selectEntities, selectAll } = adapter.getSelectors();

export const selectCustomerIds = selectIds;
export const selectCustomerEntities = selectEntities;
export const selectAllCustomers = selectAll;
