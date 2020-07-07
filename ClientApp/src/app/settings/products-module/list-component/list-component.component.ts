import { Component, OnInit } from "@angular/core";
import { GridOptions } from "ag-grid-community";
import { ProductssFacade } from "@core-data/products-store/products.facade";
import { Observable } from "rxjs/internal/Observable";
import { ProductDto } from "@shared/service-proxies/service-proxies";
import { TrueFalseValueCellRenderer } from "@shared/grid-cell-renderers/true.false.cell.renderer";
import { CurrencyValueCellRenderer } from "@shared/grid-cell-renderers/currency.value.cell.renderer";
import { ProductNameCellRenderer } from "../grid-cell-renderers/product.name.cell.renderer";
import { ProductActionsCellRenderer } from "../grid-cell-renderers/product.action.cell.renderer";

@Component({
  selector: "app-list-component",
  templateUrl: "./list-component.component.html",
  styleUrls: ["./list-component.component.scss"],
})
export class ListComponentComponent implements OnInit {
  gridOptions: GridOptions;
  products$: Observable<ProductDto[]>;
  constructor(private _productsFacade: ProductssFacade) {
    this.products$ = _productsFacade.products$;
  }

  addNewProductClick() {}
  importProducts() {
    this._productsFacade.importCustomers();
  }
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
          cellRenderer: "productActionsCellRenderer",
        },
        {
          headerName: "Product Name",
          field: "name",
          sortable: true,
          filter: true,
          resizable: true,
          width: 200,
          pinned: true,
          cellRenderer: "productNameCellRenderer",
        },
        {
          headerName: "Description",
          field: "description",
          sortable: true,
          filter: true,
          resizable: true,
          width: 300,
        },
        {
          headerName: "SKU",
          field: "sku",
          sortable: true,
          filter: true,
          resizable: true,
          width: 150,
        },
        {
          headerName: "Taxable",
          field: "taxable",
          sortable: true,
          filter: true,
          resizable: true,
          width: 150,
          cellRenderer: "trueFalseValueCellRenderer",
        },
        {
          headerName: "Price",
          field: "unitPrice",
          sortable: true,
          filter: true,
          resizable: true,
          width: 80,
          cellRenderer: "currencyValueCellRenderer",
        },
      ],
      context: this,
      rowSelection: "multiple",
      enableRangeSelection: true,
      suppressCellSelection: true,
      suppressRowClickSelection: true,
      frameworkComponents: {
        productNameCellRenderer: ProductNameCellRenderer,
        trueFalseValueCellRenderer: TrueFalseValueCellRenderer,
        currencyValueCellRenderer: CurrencyValueCellRenderer,
        productActionsCellRenderer: ProductActionsCellRenderer,
      },
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
    this._productsFacade.loadProducts();
  }
}
