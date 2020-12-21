import { createAction, props } from "@ngrx/store";
import { ExpenseCodeModel } from "@shared/service-proxies/service-proxies";

export const uiStateBusyAction = createAction(
  "[JobForms] UI State Busy",
  props<{ isBusy: boolean }>()
);

export const updateErrorStateAction = createAction(
  "[JobForms] Error state",
  props<{ errors: string[] }>()
);

export const fetchAllExpenseCodes = createAction(
  "[Expense] Fetch all expense codes action"
);

export const fetchAllExpenseCodesCompletedAction = createAction(
  "[Expense] Fetch all expense codes completed action",
  props<{ codes: ExpenseCodeModel[] }>()
);
