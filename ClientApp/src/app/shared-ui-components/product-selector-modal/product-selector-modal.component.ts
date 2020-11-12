import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductsFacade } from "@core-data/products-store/products.facade";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ProductDto } from "@shared/service-proxies/service-proxies";
import { GridOptions } from "ag-grid-community";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { SubSink } from "subsink";
import { UiComponentsService } from "../ui.components.service";
@Component({
  selector: "app-product-selector-modal",
  templateUrl: "./product-selector-modal.component.html",
  styleUrls: ["./product-selector-modal.component.scss"],
})
export class ProductSelectorModalComponent implements OnInit, OnDestroy {
  @Input() showAllProducts: boolean;
  @Input() title: string;
  @Input() selectionCallback: (product: ProductDto) => void;
  products: ProductDto[];
  groups: { groupName: string; checked?: boolean }[] = [];
  filterProductsForModal$: Observable<ProductDto[]>;
  gridOptions: GridOptions;
  private _subs = new SubSink();
  hasProducts: boolean = false;
  searchForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private _productsFacade: ProductsFacade,
    private _uiComponentService: UiComponentsService,
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

  selectProduct(product: ProductDto): void {
    if (this.selectionCallback) {
      this.selectionCallback(product);
    }
  }

  ngOnInit(): void {
    const _groups = this._uiComponentService.filterButtonsGroup;
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
