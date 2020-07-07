import { ICellRendererAngularComp } from "ag-grid-angular";
import {
  ICellRendererParams,
  IAfterGuiAttachedParams,
} from "ag-grid-community";
import { Component } from "@angular/core";

@Component({
  selector: "app-currency-cell-renderer",
  template: `<span>{{ "USD" | currencySymbol }}</span
    ><span>{{ dataVal }}</span>`,
})
export class CurrencyValueCellRenderer implements ICellRendererAngularComp {
  params: any;
  dataVal = "0.00";
  refresh(params: any): boolean {
    return false;
  }
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.dataVal = Number(params.value || 0.0).toFixed(2);
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {}
}
