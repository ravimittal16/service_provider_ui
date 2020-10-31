import { Component, OnInit } from "@angular/core";
import { CustomersFacade } from "@core-data/customers/customers.facade";
import { ProductsFacade } from "@core-data/products-store/products.facade";
import { JobsDataService } from "../jobs.data.service";
import { JobsModalService } from "../jobs.modal.service";

@Component({
  selector: "app-jobs-view",
  templateUrl: "./jobs-view.component.html",
  styleUrls: ["./jobs-view.component.scss"],
})
export class JobsViewComponent implements OnInit {
  constructor(
    private _jobsModalService: JobsModalService,
    private _customerFacade: CustomersFacade,
    private _productsFacade: ProductsFacade
  ) {}
  createNewJobClicked(): void {
    const _result = this._jobsModalService.openCreateJobModal();
  }
  ngOnInit(): void {
    this._customerFacade.loadCustomers(1);
    this._productsFacade.loadProducts();
  }
}
