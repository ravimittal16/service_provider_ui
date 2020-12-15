import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { JobsFacade } from "@core-data/index";
import { JobFormsFacade } from "@core-data/job-forms-store/job.forms.facade";
import { JobFormDto } from "@shared/service-proxies/service-proxies";

import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { JobsModalService } from "../jobs.modal.service";

@Component({
  selector: "app-job-forms-list-view",
  templateUrl: "./job-forms-list-view.component.html",
  styleUrls: ["./job-forms-list-view.component.scss"],
})
export class JobFormsListViewComponent implements OnInit {
  @Input() jobId: number;
  @Input() countEl: HTMLElement;
  jobForms$: Observable<JobFormDto[]>;
  constructor(
    private _jobsModalService: JobsModalService,
    private _jobFacade: JobsFacade,
    private _jobFormFacade: JobFormsFacade
  ) {}

  attachNewJobFormClicked(): void {
    const modelRef = this._jobsModalService.openJobFormListModal(this.jobId);
  }

  ngOnInit(): void {
    this._jobFormFacade.loadAllFormDefinations();
    this.jobForms$ = this._jobFacade.jobForms$.pipe(
      tap((list) => {
        if (this.countEl) {
          this.countEl.innerHTML = list.length.toString();
        }
      })
    );
  }
}
