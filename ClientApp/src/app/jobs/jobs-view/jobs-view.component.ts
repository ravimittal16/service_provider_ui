import { Component, OnInit } from "@angular/core";
import { CustomersFacade } from "@core-data/customers/customers.facade";
import { JobsDataService } from "../jobs.data.service";

@Component({
  selector: "app-jobs-view",
  templateUrl: "./jobs-view.component.html",
  styleUrls: ["./jobs-view.component.scss"],
})
export class JobsViewComponent implements OnInit {
  constructor(
    private jobDataService: JobsDataService,
    private _customerFacade: CustomersFacade
  ) {}
  createNewJobClicked(): void {
    const _result = this.jobDataService.openCreateJobModal();
  }
  ngOnInit(): void {
    this._customerFacade.loadCustomers(1);
  }
}
