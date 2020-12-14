import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { JobFormsFacade } from "@core-data/job-forms-store/job.forms.facade";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { JobFormDefinationDto } from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";

@Component({
  selector: "app-job-forms-list-modal",
  templateUrl: "./job-forms-list-modal.component.html",
  styleUrls: ["./job-forms-list-modal.component.scss"],
})
export class JobFormsListModalComponent implements OnInit, OnDestroy {
  @Input() jobId: number;
  jobForms$: Observable<JobFormDefinationDto[]>;
  constructor(
    public activeModal: NgbActiveModal,
    private _jobFormFacade: JobFormsFacade
  ) {
    this.jobForms$ = this._jobFormFacade.formDefinations$;
  }

  ngOnDestroy(): void {}

  attachJobFormToJob(form: JobFormDefinationDto): void {
    this._jobFormFacade.attachJobFormToJobAction(form.formId, this.jobId);
  }

  onCloseClicked(): void {
    this.activeModal.close();
  }

  ngOnInit(): void {}
}
