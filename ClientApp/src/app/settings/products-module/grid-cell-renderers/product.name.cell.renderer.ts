import { ICellRendererAngularComp } from "ag-grid-angular";
import {
  ICellRendererParams,
  IAfterGuiAttachedParams,
} from "ag-grid-community";
import { Component } from "@angular/core";

@Component({
  selector: "app-item-name-cell-renderer",
  template: `<span
    >{{ params.value }}
    <span class="badge badge-soft-warning" *ngIf="isService"
      >Service</span
    ></span
  >`,
})
export class ProductNameCellRenderer implements ICellRendererAngularComp {
  params: any;
  isService = false;
  refresh(params: any): boolean {
    return false;
  }
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.isService = params.data.type === "Service";
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {}
}
