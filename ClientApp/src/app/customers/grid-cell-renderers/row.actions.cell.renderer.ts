import { ICellRendererAngularComp } from "ag-grid-angular";
import { Component } from "@angular/core";
import {
  ICellRendererParams,
  IAfterGuiAttachedParams,
} from "ag-grid-community";

@Component({
  selector: "app-customer-display-name-link",
  template: `<button type="button" mat-raised-button role="button">
    Basic
  </button>`,
})
export class CustomerActionsCellRenderer implements ICellRendererAngularComp {
  params: any;
  refresh(params: any): boolean {
    return true;
  }
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    console.log(params);
  }
}
