import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddUpdateExpenseCodeModalComponent } from "./add-update-expense-code-modal/add-update-expense-code-modal.component";
import { SharedModule } from "@shared/shared.module";
import { CoreDataModule } from "@core-data/core.data.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const __modalComponent = [AddUpdateExpenseCodeModalComponent];

@NgModule({
  declarations: [...__modalComponent],
  exports: [...__modalComponent],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class ExpenseModule {}
