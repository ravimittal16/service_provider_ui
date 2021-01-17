import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductsFacade } from "@core-data/products-store/products.facade";
import { NgbActiveModal, NgbPopover } from "@ng-bootstrap/ng-bootstrap";
import { ProductDto } from "@shared/service-proxies/service-proxies";
import { GridOptions } from "ag-grid-community";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { SubSink } from "subsink";
import { SharedDataService } from "../shared.data.service";
@Component({
  selector: "app-product-selector-modal",
  templateUrl: "./product-selector-modal.component.html",
  styleUrls: ["./product-selector-modal.component.scss"],
})
export class ProductSelectorModalComponent implements OnInit, OnDestroy {
  @Input() showAllProducts: boolean;
  @Input() title: string;
  @Input() selectionCallback: (product: ProductDto) => void;
  @Input() showQuantityPopover: boolean = true;
  @ViewChild("quantityInput") quantityInput: ElementRef;
  products: ProductDto[];
  groups: { groupName: string; checked?: boolean }[] = [];
  filterProductsForModal$: Observable<ProductDto[]>;
  gridOptions: GridOptions;
  private _subs = new SubSink();
  hasProducts: boolean = false;
  searchForm: FormGroup;
  quantityVal: number = 1;
  selectedProduct: ProductDto;
  private __quantityPopoverRef: NgbPopover;
  constructor(
    public activeModal: NgbActiveModal,
    private _productsFacade: ProductsFacade,
    private _shaedDateService: SharedDataService,
    private _cdr: ChangeDetectorRef,
    private _fb: FormBuilder
  ) {}
  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  onSelectionChanged(group: any): void {
    this._productsFacade.onGroupSelected(group);
  }

  private _initSearchForm() {
    this.searchForm = this._fb.group({
      searchCriteria: ["", [Validators.required]],
    });
  }

  selectProduct(
    product: ProductDto,
    quantityPopover: NgbPopover,
    final: boolean
  ): void {
    // ==========================================================
    // Closing the already opened popover
    // ==========================================================
    if (this.__quantityPopoverRef && this.__quantityPopoverRef.isOpen) {
      this.__quantityPopoverRef.close();
    }
    this.__quantityPopoverRef = quantityPopover;
    if (product && product.isServiceType) {
      const __product = { ...product };
      __product.quantity = 0;
      this.selectionCallback(__product as ProductDto);
    } else {
      this.selectedProduct = product;
      if (!final && this.showQuantityPopover) {
        quantityPopover.open();
        setTimeout(() => {
          const __inputBox = document.getElementById("quantityInput");
          if (__inputBox) __inputBox.focus();
        }, 10);
      } else {
        if (this.selectedProduct && this.selectionCallback) {
          const __product = { ...this.selectedProduct };
          __product.quantity = this.quantityVal;
          this.selectionCallback(__product as ProductDto);
          this.quantityVal = 1;
        }
      }
    }
  }

  closePopover(): void {
    if (this.__quantityPopoverRef) {
      this.__quantityPopoverRef.close();
    }
  }

  ngOnInit(): void {
    const _groups = this._shaedDateService.filterButtonsGroup;
    this._productsFacade.onGroupSelected(_groups[1]);
    this.groups = _groups;
    this.filterProductsForModal$ = this._productsFacade.filterProductsForModal$.pipe(
      tap((data) => {
        this.hasProducts = data && data.length > 0;
        this._cdr.detectChanges();
      })
    );
    this._initSearchForm();
  }
}
