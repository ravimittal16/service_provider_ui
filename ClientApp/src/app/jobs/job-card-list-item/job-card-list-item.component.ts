import { Component, Input, OnInit } from "@angular/core";
import { JobDto } from "@shared/service-proxies/service-proxies";

@Component({
  selector: "app-job-card-list-item",
  templateUrl: "./job-card-list-item.component.html",
  styleUrls: ["./job-card-list-item.component.scss"],
})
export class JobCardListItemComponent implements OnInit {
  @Input() job: JobDto;
  @Input() isFirstItem: boolean;
  constructor() {}

  ngOnInit(): void {}
}
