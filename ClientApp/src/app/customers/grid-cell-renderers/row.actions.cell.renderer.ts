import { ICellRendererAngularComp } from "ag-grid-angular";
import { Component, ViewEncapsulation, OnDestroy } from "@angular/core";
import {
  ICellRendererParams,
  IAfterGuiAttachedParams,
} from "ag-grid-community";
import { ListComponent } from "../list/list.component";

@Component({
  selector: "app-customer-display-name-link",
  template: `
    <div class="dropdown text-sans-serif btn-reveal-trigger">
      <button
        class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal dropdown-caret-none"
        type="button"
        id="{{ params.data.id }}"
        data-toggle="dropdown"
        data-boundary="viewport"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span class="fa fa-ellipsis-v fs--2"></span>
      </button>
      <div
        class="dropdown-menu border py-0"
        attr.aria-labelledby="{{ params.data.id }}"
      >
        <div class="bg-white">
          <a class="dropdown-item" (click)="raiseRowNodeClickEvent('edit')"
            >Edit</a
          >
          <a class="dropdown-item" (click)="raiseRowNodeClickEvent('details')"
            >Show All Details</a
          >
          <a class="dropdown-item" (click)="raiseRowNodeClickEvent('createJob')"
            >Create Job</a
          >
          <a
            class="dropdown-item"
            (click)="raiseRowNodeClickEvent('createEstimate')"
            >Create Estimate</a
          >
          <a class="dropdown-item" (click)="raiseRowNodeClickEvent('report')"
            >Generate Report</a
          >
          <div class="dropdown-divider"></div>
          <!-- <a
            class="dropdown-item text-danger"
            (click)="raiseRowNodeClickEvent('delete')"
            >Delete customer</a
          > -->
          <a
            class="dropdown-item text-danger"
            (click)="raiseRowNodeClickEvent('ínactive')"
            >Make in-active</a
          >
        </div>
      </div>
    </div>
  `,
})
export class CustomerActionsCellRenderer
  implements ICellRendererAngularComp, OnDestroy {
  params: any;

  ngOnDestroy(): void {}
  // ==========================================================
  // handling click event for each menu item | triggerCustomerEvent
  // ==========================================================
  // TODO : REFACTORING REQUIRED
  raiseRowNodeClickEvent(
    eventName:
      | "edit"
      | "details"
      | "createJob"
      | "createEstimate"
      | "report"
      | "delete"
      | "ínactive"
  ): void {
    console.log(eventName);
    const listComponent = this.params.context as ListComponent;
    if (listComponent) {
      listComponent.triggerCustomerEvent(eventName, this.params.data);
    }
  }

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
