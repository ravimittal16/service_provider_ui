import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { JobDto } from "@shared/service-proxies/service-proxies";
import { JobsModalService } from "../jobs.modal.service";

@Component({
  selector: "app-job-card-list-item",
  templateUrl: "./job-card-list-item.component.html",
  styleUrls: ["./job-card-list-item.component.scss"],
})
export class JobCardListItemComponent implements OnInit {
  @Input() job: JobDto;
  @Input() isFirstItem: boolean;
  constructor(
    private _router: Router,
    private _jobsModalService: JobsModalService
  ) {}

  onJobTitleClicked(): void {
    // this._router.navigate(["app/jobs/editJob", this.job.jobId]);
    this._jobsModalService.openJobDetailModal(true, this.job);
  }

  ngOnInit(): void {}
}
