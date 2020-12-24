import { Component, Input, OnInit } from "@angular/core";
import { ExpenseService } from "../expense.service";

@Component({
  selector: "app-add-expense-button",
  templateUrl: "./add-expense-button.component.html",
  styleUrls: ["./add-expense-button.component.scss"],
})
export class AddExpenseButtonComponent implements OnInit {
  @Input() jobId: number;
  constructor(private expenseService: ExpenseService) {}

  onAddExpenseClicked() {
    this.expenseService.openExpenseModal(this.jobId);
  }

  ngOnInit(): void {}
}
