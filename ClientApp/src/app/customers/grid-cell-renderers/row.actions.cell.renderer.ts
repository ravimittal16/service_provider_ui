import { ICellRendererAngularComp } from "ag-grid-angular";
import { Component, ViewEncapsulation, OnDestroy } from "@angular/core";
import {
  ICellRendererParams,
  IAfterGuiAttachedParams,
} from "ag-grid-community";

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
        (click)="onClicked()"
      >
        <span class="fa fa-ellipsis-h fs--2"></span>
      </button>
      <div
        class="dropdown-menu border py-0"
        [ngClass]="{ show: showingMenu }"
        attr.aria-labelledby="{{ params.data.id }}"
      >
        <div class="bg-white">
          <a class="dropdown-item" (click)="raiseClickEvent('edit')">Edit</a>
          <a class="dropdown-item" (click)="raiseClickEvent('createJob')"
            >Create Job</a
          >
          <a class="dropdown-item" (click)="raiseClickEvent('createEstimate')"
            >Create Estimate</a
          >
          <a class="dropdown-item" (click)="raiseClickEvent('report')"
            >Generate Report</a
          >
          <div class="dropdown-divider"></div>
          <a
            class="dropdown-item text-danger"
            (click)="raiseClickEvent('delete')"
            >Remove</a
          >
        </div>
      </div>
    </div>
  `,
})
export class CustomerActionsCellRenderer
  implements ICellRendererAngularComp, OnDestroy {
  params: any;
  showingMenu = false;

  ngOnDestroy(): void {}
  // ==========================================================
  // handling click event for each menu item
  // ==========================================================
  raiseClickEvent(
    eventName: "edit" | "createJob" | "createEstimate" | "report" | "delete"
  ): void {
    console.log(eventName);
    this.showingMenu = !this.showingMenu;
  }

  onClicked(): void {
    this.showingMenu = !this.showingMenu;
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
