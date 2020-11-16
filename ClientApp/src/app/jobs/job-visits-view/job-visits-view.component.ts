import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-job-visits-view",
  templateUrl: "./job-visits-view.component.html",
  styleUrls: ["./job-visits-view.component.scss"],
})
export class JobVisitsViewComponent implements OnInit {
  @Input() jobId: number;
  constructor() {}

  ngOnInit(): void {}
}
