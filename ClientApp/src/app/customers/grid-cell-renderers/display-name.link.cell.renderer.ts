import { ICellRendererAngularComp } from "ag-grid-angular";
import {
  ICellRendererParams,
  IAfterGuiAttachedParams,
} from "ag-grid-community";
import { Component } from "@angular/core";

@Component({
  selector: "app-customer-display-name-link",
  template: `<a
    class="btn btn-link link"
    title="show all details {{ params.data.fullName }}"
    [routerLink]="['/app/customers/detail', params.data.id]"
    >{{ params.value }}</a
  >`,
})
export class CustomerDisplayNameLinkCellRenderer
  implements ICellRendererAngularComp {
  params: any;
  refresh(params: any): boolean {
    return false;
  }
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {}
}
