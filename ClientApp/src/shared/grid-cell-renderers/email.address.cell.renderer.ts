import { ICellRendererAngularComp } from "ag-grid-angular";
import {
  ICellRendererParams,
  IAfterGuiAttachedParams,
} from "ag-grid-community";
import { Component } from "@angular/core";

@Component({
  selector: "app-customer-display-name-link",
  template:
    "<a class='btn btn-link link' href='mailto:{{params.value}}'>{{params.value}}</a>",
})
export class EmailAddressLinkCellRenderer implements ICellRendererAngularComp {
  params: any;
  refresh(params: any): boolean {
    return false;
  }
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {}
}
