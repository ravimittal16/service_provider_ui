import { Component, OnInit } from "@angular/core";
import { CustomersFacade } from "@core-data/customers/customers.facade";
import { JobsFacade } from "@core-data/jobs-store/jobs.facade";
import { ProductsFacade } from "@core-data/products-store/products.facade";
import { JobDto } from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";
import { JobsDataService } from "../jobs.data.service";
import { JobsModalService } from "../jobs.modal.service";

@Component({
  selector: "app-jobs-view",
  templateUrl: "./jobs-view.component.html",
  styleUrls: ["./jobs-view.component.scss"],
})
export class JobsViewComponent implements OnInit {
  hasFiltersApplied = true;
  jobs$: Observable<JobDto[]>;
  constructor(
    private _jobsModalService: JobsModalService,
    private _jobsFacade: JobsFacade
  ) {
    this.jobs$ = _jobsFacade.jobs$;
  }

  clearFilters(): void {
    this.hasFiltersApplied = false;
  }

  applyFilters(): void {
    this.hasFiltersApplied = true;
  }

  createNewJobClicked(): void {
    const _result = this._jobsModalService.openCreateJobModal();
    _result.result.then((modalRes) => {
      if (modalRes && modalRes.reload) {
        this._jobsFacade.loadJobs();
      }
    });
  }
  ngOnInit(): void {
    this._jobsFacade.loadJobs();
  }
}
