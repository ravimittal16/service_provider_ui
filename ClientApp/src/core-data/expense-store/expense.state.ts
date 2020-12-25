import {
  ExpenseCodeModel,
  ExpenseDto,
} from "@shared/service-proxies/service-proxies";
import { BaseState } from "@core-data/base.state";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

export class ExpenseActionListenerSchema {
  actionType: string;
  expenseCode?: number;
  formId?: number;
  message?: string;
  success?: boolean;
  fieldId?: number;
}

export interface ExpenseCodeState extends BaseState<ExpenseCodeModel> {
  expenseCodeModal: NgbActiveModal;
  jobExpenses: ExpenseDto[];
}
export interface ExpenseState extends BaseState<ExpenseDto> {
  jobId: number;
  expenseModal: NgbActiveModal;
}
export interface ExpenseStoreState {
  isBusy: boolean;
  errors: [];
  isSuccess: boolean;
  expenseActionListener: ExpenseActionListenerSchema;
  expenseCodesState: ExpenseCodeState;
  expenseState: ExpenseState;
}
