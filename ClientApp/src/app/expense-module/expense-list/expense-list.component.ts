import { Component, Input, OnInit } from "@angular/core";
import { ExpenseFacade } from "@core-data/index";
import { ExpenseDto } from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";

@Component({
  selector: "app-expense-list",
  templateUrl: "./expense-list.component.html",
  styleUrls: ["./expense-list.component.scss"],
})
export class ExpenseListComponent implements OnInit {
  @Input() jobId: number;
  jobExpenses$: Observable<ExpenseDto[]>;
  constructor(private _expenseFacade: ExpenseFacade) {
    this.jobExpenses$ = _expenseFacade.jobExpenses$;
  }

  ngOnInit(): void {
    this._expenseFacade.fetchAllJobExpenses(this.jobId);
  }
}
