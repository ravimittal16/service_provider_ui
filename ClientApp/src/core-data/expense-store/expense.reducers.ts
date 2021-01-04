import {
  ExpenseCodeModel,
  ExpenseDto,
} from "@shared/service-proxies/service-proxies";
import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import { createReducer, Action, on } from "@ngrx/store";

import * as fromAllActions from "./expense.actions";
import {
  ExpenseCodeState,
  ExpenseState,
  ExpenseStoreState,
} from "./expense.state";
import { Update } from "@ngrx/entity";

export const expenseStoreFeatureKey = "expense";

export function selectExpenseCodeId(a: ExpenseCodeModel): string {
  return a.expenseCodeId.toString();
}
export function selectExpenseId(a: ExpenseDto): string {
  return a.expenseId.toString();
}

export const expenseCodeAdapter: EntityAdapter<ExpenseCodeModel> = createEntityAdapter<ExpenseCodeModel>(
  {
    selectId: selectExpenseCodeId,
  }
);
export const expenseAdapter: EntityAdapter<ExpenseDto> = createEntityAdapter<ExpenseDto>(
  {
    selectId: selectExpenseId,
  }
);

const _expenseCodesState: ExpenseCodeState = expenseCodeAdapter.getInitialState(
  {
    expenseCodeModal: null,
    isBusy: false,
    items: [],
    success: false,
    errors: [],
    actionReturnCode: null,
    jobExpenses: [],
  }
);

const _expenseState: ExpenseState = expenseAdapter.getInitialState({
  isBusy: false,
  items: [],
  success: false,
  errors: [],
  actionReturnCode: null,
  expenseModal: null,
  jobId: 0,
});

export const initialState: ExpenseStoreState = {
  isBusy: false,
  errors: [],
  isSuccess: false,
  expenseActionListener: null,
  expenseCodesState: _expenseCodesState,
  expenseState: _expenseState,
};

const createFeatureReducer = createReducer(
  initialState,
  on(fromAllActions.uiStateBusyAction, (state, props) => ({
    ...state,
    isBusy: props.isBusy,
  })),
  // ==========================================================
  // EXPENSE CODE STATE REDUCER
  // ==========================================================
  on(fromAllActions.setExpenseCodeModalRef, (state, props) => {
    const _expenseCodeState: ExpenseCodeState = { ...state.expenseCodesState };
    _expenseCodeState.expenseCodeModal = props.modal;
    return {
      ...state,
      expenseCodesState: _expenseCodeState,
    };
  }),
  on(fromAllActions.updateErrorStateAction, (state, props) => ({
    ...state,
    isBusy: false,
    errors: props.errors,
  })),
  on(
    fromAllActions.triggerAddUpdateExpenseCodeCompletedAction,
    (state, props) => {
      let _expenseCodeState = state.expenseCodesState;
      if (props.isSuccess && props.entity) {
        if (props.isAdded) {
          _expenseCodeState = expenseCodeAdapter.addOne(
            props.entity,
            _expenseCodeState
          );
        } else {
          const editSubmission: Update<ExpenseCodeModel> = {
            id: props.entity.expenseCodeId,
            changes: { codeName: props.entity.codeName },
          };
          _expenseCodeState = expenseCodeAdapter.updateOne(
            editSubmission,
            _expenseCodeState
          );
        }
        _expenseCodeState.expenseCodeModal = null;
      }
      return {
        ...state,
        expenseCodesState: _expenseCodeState,
        isBusy: false,
        errors: [],
      };
    }
  ),
  on(fromAllActions.fetchAllExpenseCodesCompletedAction, (state, props) => {
    let _expenseCodeState = state.expenseCodesState;
    _expenseCodeState = expenseCodeAdapter.addMany(
      props.codes,
      _expenseCodeState
    );
    return {
      ...state,
      isBusy: false,
      expenseCodesState: _expenseCodeState,
    };
  }),
  // ==========================================================
  // EXPENSE STATE REDUCERS
  // ==========================================================
  on(fromAllActions.fetchAllJobExpenseCompletedAction, (state, props) => {
    let _expenseState = state.expenseState;
    _expenseState = expenseAdapter.addMany(props.expenses, _expenseState);
    return {
      ...state,
      expenseState: _expenseState,
      isBusy: false,
    };
  }),
  on(fromAllActions.triggerAddUpdateExpenseCompletedAction, (state, props) => {
    let _expenseState = state.expenseState;
    if (props.isForAdd) {
      _expenseState = expenseAdapter.addOne(props.entity, _expenseState);
    } else {
      const editSubmission: Update<ExpenseDto> = {
        id: props.entity.expenseId,
        changes: {
          title: props.entity.title,
          description: props.entity.description,
        },
      };
      _expenseState = expenseAdapter.updateOne(editSubmission, _expenseState);
    }
    return {
      ...state,
      expenseState: _expenseState,
      isBusy: false,
    };
  })
);

export function reducer(state: ExpenseStoreState | undefined, action: Action) {
  return createFeatureReducer(state, action);
}
