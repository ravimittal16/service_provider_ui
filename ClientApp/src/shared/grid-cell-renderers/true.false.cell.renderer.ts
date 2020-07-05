import { ICellRendererAngularComp } from "ag-grid-angular";
import {
  ICellRendererParams,
  IAfterGuiAttachedParams,
} from "ag-grid-community";
import { Component } from "@angular/core";

@Component({
  selector: "app-true-false-cell-renderer",
  template: `<span
    class="badge badge-pill "
    [ngClass]="{
      'badge-soft-secondary': !dataVal,
      'badge-soft-primary': dataVal
    }"
    >{{ params.value ? "Yes" : "No" }}</span
  >`,
})
export class TrueFalseValueCellRenderer implements ICellRendererAngularComp {
  params: any;
  dataVal = false;
  refresh(params: any): boolean {
    return false;
  }
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.dataVal = params.value || false;
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {}
}
