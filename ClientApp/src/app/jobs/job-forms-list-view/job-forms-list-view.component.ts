import { Component, Input, OnInit } from "@angular/core";
import { JobFormsFacade } from "@core-data/job-forms-store/job.forms.facade";
import { JobsModalService } from "../jobs.modal.service";

@Component({
  selector: "app-job-forms-list-view",
  templateUrl: "./job-forms-list-view.component.html",
  styleUrls: ["./job-forms-list-view.component.scss"],
})
export class JobFormsListViewComponent implements OnInit {
  @Input() jobId: number;
  constructor(
    private _jobsModalService: JobsModalService,
    private _jobFormFacade: JobFormsFacade
  ) {}

  attachNewJobFormClicked(): void {
    const modelRef = this._jobsModalService.openJobFormListModal(this.jobId);
  }

  ngOnInit(): void {
    this._jobFormFacade.loadAllFormDefinations();
  }
}
