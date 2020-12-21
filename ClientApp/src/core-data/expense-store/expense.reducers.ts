import {
  ExpenseCodeModel,
  JobFormDefinationDto,
} from "@shared/service-proxies/service-proxies";
import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import { createReducer, Action, on } from "@ngrx/store";

import * as fromAllActions from "./expense.actions";
import { ExpenseState } from "./expense.state";

export const expenseStoreFeatureKey = "expense";

export function selectedCode(a: ExpenseCodeModel): string {
  return a.expenseCodeId.toString();
}

export const adapter: EntityAdapter<ExpenseCodeModel> = createEntityAdapter<ExpenseCodeModel>(
  {
    selectId: selectedCode,
  }
);
export const initialState: ExpenseState = adapter.getInitialState({
  isBusy: false,
  errors: [],
  success: false,
  items: [],
});

const createFeatureReducer = createReducer(
  initialState,
  on(fromAllActions.uiStateBusyAction, (state, props) => ({
    ...state,
    isBusy: props.isBusy,
  })),
  on(fromAllActions.updateErrorStateAction, (state, props) => ({
    ...state,
    isBusy: false,
    errors: props.errors,
  })),
  on(fromAllActions.fetchAllExpenseCodesCompletedAction, (state, props) => {
    return {
      ...state,
    };
  })
);

export function reducer(state: ExpenseState | undefined, action: Action) {
  return createFeatureReducer(state, action);
}
