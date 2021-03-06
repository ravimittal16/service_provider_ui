import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { createAction, props } from "@ngrx/store";
import {
  CreateExpenseModel,
  ExpenseCodeModel,
  ExpenseDto,
} from "@shared/service-proxies/service-proxies";

export const uiStateBusyAction = createAction(
  "[Expense] UI State Busy",
  props<{ isBusy: boolean }>()
);

export const updateErrorStateAction = createAction(
  "[Expense] Error state",
  props<{ errors: string[] }>()
);

export const fetchAllExpenseCodes = createAction(
  "[Expense] Fetch all expense codes action"
);

export const fetchAllExpenseCodesCompletedAction = createAction(
  "[Expense] Fetch all expense codes completed action",
  props<{ codes: ExpenseCodeModel[] }>()
);
// ==========================================================
// ADD UPDATE EXPENSE CODE ACTIONS
// ==========================================================
export const triggerAddUpdateExpenseCodeAction = createAction(
  "[Expense] Add update expense code action",
  props<{ model: ExpenseCodeModel }>()
);
export const triggerAddUpdateExpenseCodeCompletedAction = createAction(
  "[Expense] Add update expense code completed action",
  props<{ entity: ExpenseCodeModel; isSuccess: boolean; isAdded: boolean }>()
);
export const setExpenseCodeModalRef = createAction(
  "[Expense] set active modal ref action",
  props<{ modal: NgbActiveModal }>()
);
// ==========================================================
// ADD UPDATE EXPENSE
// ==========================================================

export const triggerAddUpdateExpenseAction = createAction(
  "[Expense] Add update expense.",
  props<{ model: CreateExpenseModel }>()
);
export const triggerAddUpdateExpenseCompletedAction = createAction(
  "[Expense] Add update expense completed action.",
  props<{ entity: ExpenseDto; isSuccess: boolean; isForAdd: boolean }>()
);
// ==========================================================
// EXPENSE DTO
// ==========================================================
export const fetchAllJobExpenseAction = createAction(
  "[Expense] Fetch all job expense action",
  props<{ jobId: number }>()
);
export const fetchAllJobExpenseCompletedAction = createAction(
  "[Expense] Fetch all job expense completed action",
  props<{ expenses: ExpenseDto[] }>()
);
