import { Component, OnInit } from "@angular/core";
import { GridOptions } from "ag-grid-community";

@Component({
  selector: "app-list-component",
  templateUrl: "./list-component.component.html",
  styleUrls: ["./list-component.component.scss"],
})
export class ListComponentComponent implements OnInit {
  gridOptions: GridOptions;
  constructor() {}

  addNewProductClick() {}
  importProducts() {}
  private _initGrid(): void {
    this.gridOptions = <GridOptions>{
      columnDefs: [
        {
          headerName: "Actions",
          field: "",
          width: 80,
          checkboxSelection: false,
          suppressSorting: true,
          pinned: true,
        },
        {
          headerName: "Product Name",
          field: "displayName",
          sortable: true,
          filter: true,
          resizable: true,
          width: 200,
          pinned: true,
        },
        {
          headerName: "Description",
          field: "displayName",
          sortable: true,
          filter: true,
          resizable: true,
          width: 300,
          pinned: true,
        },
        {
          headerName: "Category",
          field: "displayName",
          sortable: true,
          filter: true,
          resizable: true,
          width: 150,
          pinned: true,
        },
        {
          headerName: "SKU",
          field: "displayName",
          sortable: true,
          filter: true,
          resizable: true,
          width: 150,
          pinned: true,
        },
        {
          headerName: "Price",
          field: "displayName",
          sortable: true,
          filter: true,
          resizable: true,
          width: 100,
          pinned: true,
        },
      ],
      context: this,
      rowSelection: "multiple",
      enableRangeSelection: true,
      suppressCellSelection: true,
      suppressRowClickSelection: true,

      onSelectionChanged: (params) => {
        if (params.api) {
        }
      },
      onGridReady: (params) => {
        if (params.api) {
          params.api.sizeColumnsToFit();
        }
      },
    };
  }
  ngOnInit(): void {
    this._initGrid();
  }
}
