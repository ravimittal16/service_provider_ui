import { Component, Input, OnInit } from "@angular/core";
import { JobLineItemDto } from "@shared/service-proxies/service-proxies";

@Component({
  selector: "app-job-items-list-view",
  templateUrl: "./job-items-list-view.component.html",
  styleUrls: ["./job-items-list-view.component.scss"],
})
export class JobItemsListViewComponent implements OnInit {
  @Input() jobId: number;
  @Input() initialItems: JobLineItemDto[];
  lineItems: JobLineItemDto[] = [];
  constructor() {}

  addLineItemClicked(fromTable: boolean): void {}

  ngOnInit(): void {
    if (this.initialItems) {
      this.lineItems.push(...this.initialItems);
    }
  }
}
