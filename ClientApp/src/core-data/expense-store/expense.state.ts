import { ExpenseCodeModel } from "@shared/service-proxies/service-proxies";
import { BaseState } from "@core-data/base.state";

export class ExpenseActionListenerSchema {
  actionType: string;

  expenseCode?: number;
  formId?: number;
  message?: string;
  success?: boolean;
  fieldId?: number;
}

export interface ExpenseState extends BaseState<ExpenseCodeModel> {}
