import { createFeatureSelector, createSelector } from "@ngrx/store";
import { expenseStoreFeatureKey, adapter } from "./expense.reducers";
import { ExpenseState } from "./expense.state";

export const jobFormsState = createFeatureSelector<ExpenseState>(
  expenseStoreFeatureKey
);

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectAllExpenseCodes = createSelector(jobFormsState, selectAll);
export const selectAllErrors = createSelector(
  jobFormsState,
  (state) => state.errors
);
