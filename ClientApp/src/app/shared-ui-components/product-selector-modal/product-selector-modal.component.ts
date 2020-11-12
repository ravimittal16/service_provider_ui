import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { ProductsFacade } from "@core-data/products-store/products.facade";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ProductDto } from "@shared/service-proxies/service-proxies";
import { GridOptions } from "ag-grid-community";
import { Observable } from "rxjs";
import { SubSink } from "subsink";
import { UiComponentsService } from "../ui.components.service";
@Component({
  selector: "app-product-selector-modal",
  templateUrl: "./product-selector-modal.component.html",
  styleUrls: ["./product-selector-modal.component.scss"],
})
export class ProductSelectorModalComponent implements OnInit, OnDestroy {
  @Input() showAllProducts: boolean;
  products: ProductDto[];
  groups: { groupName: string; checked?: boolean }[] = [];
  filterProductsForModal$: Observable<ProductDto[]>;
  gridOptions: GridOptions;
  private _subs = new SubSink();
  constructor(
    public activeModal: NgbActiveModal,
    private _productsFacade: ProductsFacade,
    private _uiComponentService: UiComponentsService
  ) {
    this.filterProductsForModal$ = this._productsFacade.filterProductsForModal$;
  }
  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  onSelectionChanged(group: any): void {
    this._productsFacade.onGroupSelected(group);
  }

  private _subcribeToProducts() {
    if (!this.showAllProducts) {
      this._subs.add(
        this._productsFacade.servicesOnly$.subscribe((x) => (this.products = x))
      );
    } else {
      this._subs.add(
        this._productsFacade.products$.subscribe((x) => (this.products = x))
      );
    }
  }

  ngOnInit(): void {
    this.groups = this._uiComponentService.filterButtonsGroup;
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
    };
    this.filterProductsForModal$.subscribe((products) => {
      console.log(products);
    });
  }
}
