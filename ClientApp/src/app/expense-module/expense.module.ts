import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddUpdateExpenseCodeModalComponent } from "./add-update-expense-code-modal/add-update-expense-code-modal.component";
import { SharedModule } from "@shared/shared.module";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddExpenseButtonComponent } from "./add-expense-button/add-expense-button.component";
import { AddExpenseModalComponent } from "./add-expense-modal/add-expense-modal.component";
import { ExpenseListComponent } from "./expense-list/expense-list.component";
import { ExpenseService } from "./expense.service";

const __modalComponent = [
  AddUpdateExpenseCodeModalComponent,
  AddExpenseModalComponent,
];
const __otherComponents = [AddExpenseButtonComponent, ExpenseListComponent];

@NgModule({
  declarations: [...__modalComponent, ...__otherComponents],
  exports: [...__modalComponent, ...__otherComponents],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
  providers: [ExpenseService],
})
export class ExpenseModule {}
