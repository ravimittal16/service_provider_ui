import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  expenseStoreFeatureKey,
  expenseAdapter,
  expenseCodeAdapter,
} from "./expense.reducers";
import { ExpenseStoreState } from "./expense.state";

export const expenseStoreState = createFeatureSelector<ExpenseStoreState>(
  expenseStoreFeatureKey
);

const {
  selectAll: allExpenseCodes,
} = expenseCodeAdapter.getSelectors<ExpenseStoreState>(
  (x) => x.expenseCodesState
);

const {
  selectAll: selectAllExpenses,
} = expenseAdapter.getSelectors<ExpenseStoreState>((x) => x.expenseState);

export const selectAllJobExpenses = createSelector(
  expenseStoreState,
  selectAllExpenses
);
export const selectAllExpenseCodes = createSelector(
  expenseStoreState,
  allExpenseCodes
);
export const selectAllErrors = createSelector(
  expenseStoreState,
  (state) => state.errors
);
export const selectActiveModal = createSelector(
  expenseStoreState,
  (state) => state.expenseCodesState?.expenseCodeModal
);
