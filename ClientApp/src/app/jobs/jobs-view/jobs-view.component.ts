import { Component, OnInit } from "@angular/core";
import { JobsDataService } from "../jobs.data.service";

@Component({
  selector: "app-jobs-view",
  templateUrl: "./jobs-view.component.html",
  styleUrls: ["./jobs-view.component.scss"],
})
export class JobsViewComponent implements OnInit {
  constructor(private jobDataService: JobsDataService) {}
  createNewJobClicked(): void {
    const _result = this.jobDataService.openCreateJobModal();
  }
  ngOnInit(): void {}
}
