import {
  ExpenseCodeModel,
  JobFormDefinationDto,
} from "@shared/service-proxies/service-proxies";
import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import { createReducer, Action, on } from "@ngrx/store";

import * as fromAllActions from "./expense.actions";
import { ExpenseState } from "./expense.state";
import { Update } from "@ngrx/entity";

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
  activeModal: null,
});

const createFeatureReducer = createReducer(
  initialState,
  on(fromAllActions.uiStateBusyAction, (state, props) => ({
    ...state,
    isBusy: props.isBusy,
  })),
  on(fromAllActions.setActiveModalRef, (state, props) => ({
    ...state,
    activeModal: props.modal,
  })),
  on(fromAllActions.updateErrorStateAction, (state, props) => ({
    ...state,
    isBusy: false,
    errors: props.errors,
  })),
  on(
    fromAllActions.triggerAddUpdateExpenseCodeCompletedAction,
    (state, props) => {
      let __state = state;
      if (props.isSuccess && props.entity) {
        if (props.isAdded) {
          __state = adapter.addOne(props.entity, state);
        } else {
          const editSubmission: Update<ExpenseCodeModel> = {
            id: props.entity.expenseCodeId,
            changes: { codeName: props.entity.codeName },
          };
          __state = adapter.updateOne(editSubmission, state);
        }
      }
      return {
        ...__state,
        isBusy: false,
        errors: [],
      };
    }
  ),
  on(fromAllActions.fetchAllExpenseCodesCompletedAction, (state, props) => {
    const __state = adapter.addMany(props.codes, state);
    return {
      ...__state,
      isBusy: false,
    };
  })
);

export function reducer(state: ExpenseState | undefined, action: Action) {
  return createFeatureReducer(state, action);
}
