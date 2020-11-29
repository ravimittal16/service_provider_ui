import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { JobsFacade } from "@core-data/index";

import { JobDetailsDto } from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { SubSink } from "subsink";

@Component({
  selector: "app-edit-job-view",
  templateUrl: "./edit-job-view.component.html",
  styleUrls: ["./edit-job-view.component.scss"],
})
export class EditJobViewComponent implements OnInit {
  @ViewChild("itemCounter") itemCounter: ElementRef;
  @ViewChild("visitsCount") visitsCountEl: ElementRef;
  jobId: number;
  private _sub = new SubSink();
  selectedJobDetails$: Observable<JobDetailsDto>;
  details: JobDetailsDto = null;
  detailsLoaded = false;
  constructor(
    private _jobsStoreFacade: JobsFacade,
    private _route: ActivatedRoute
  ) {}

  private _loadJobDetails() {
    if (this.jobId) {
      this._jobsStoreFacade.fetchJobDetails(this.jobId);
    }
  }
  onItemAddCompleted(details: { totalItems: number }): void {
    this.itemCounter.nativeElement.innerHTML = `${details.totalItems}`;
  }

  markAsCompleted() {}

  ngOnInit(): void {
    this._sub.add(
      this._route.params.subscribe((routeParams: Params) => {
        this.jobId = +routeParams["jobId"];
        this._loadJobDetails();
      }),
      this._jobsStoreFacade.selectedJobDetails$
        .pipe(finalize(() => {}))
        .subscribe((details) => {
          this.detailsLoaded = true;
          if (details) {
            this.details = details;
            setTimeout(() => {
              this.itemCounter.nativeElement.innerHTML = `${this.details.lineItems.length}`;
              this.visitsCountEl.nativeElement.innerHTML = `${this.details.jobVisits.length}`;
            }, 100);
          }
        })
    );
  }
}
