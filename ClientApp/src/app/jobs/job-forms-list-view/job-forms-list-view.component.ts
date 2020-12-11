import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-job-forms-list-view",
  templateUrl: "./job-forms-list-view.component.html",
  styleUrls: ["./job-forms-list-view.component.scss"],
})
export class JobFormsListViewComponent implements OnInit {
  @Input() jobId: number;
  constructor() {}

  ngOnInit(): void {}
}
