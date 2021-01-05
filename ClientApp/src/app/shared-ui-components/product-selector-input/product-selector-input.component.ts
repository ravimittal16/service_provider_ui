import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { ProductsFacade } from "@core-data/products-store/products.facade";
import { ProductDto } from "@shared/service-proxies/service-proxies";
import { Guid } from "guid-typescript";
import { Observable } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from "rxjs/operators";
import { SubSink } from "subsink";
import { UiComponentsService } from "../ui.components.service";

@Component({
  selector: "app-product-selector-input",
  templateUrl: "./product-selector-input.component.html",
  styleUrls: ["./product-selector-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProductSelectorInputComponent),
      multi: true,
    },
  ],
})
export class ProductSelectorInputComponent
  implements OnInit, ControlValueAccessor, OnDestroy {
  @Input() label: string = "Select Service";
  @Input() validationMessages: { [key: string]: string } = {};
  @Input() validationMessagesKey: string = "";
  @Input() filterServiceTypeOnly: boolean = true;
  @Input() showLabel: boolean = true;
  @Input() setAutoFocus: boolean = false;
  // ==========================================================
  // default this will show only services, pass [onlyServices]="false" if you want all products
  // ==========================================================
  @Input() onlyServices: boolean = true;
  @Output()
  onSelectionChanged: EventEmitter<ProductDto> = new EventEmitter<ProductDto>();
  id: string;
  public value: ProductDto;
  products: ProductDto[];
  private _subs = new SubSink();

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    private _productsFacade: ProductsFacade,
    private _componentService: UiComponentsService
  ) {}

  onChange: (_: any) => {};

  onTouched = () => {};

  onSelectionChange(): void {
    setTimeout(() => {
      this.onChange(this.value);
      if (this.onSelectionChanged) {
        this.onSelectionChanged.emit(this.value);
      }
    });
  }

  showListButtonClicked() {
    const _modal = this._componentService.openProductSelectorModal(
      true,
      "Select Product",
      false,
      (product: ProductDto) => {
        this.writeValue(product);
        this.onSelectionChanged.emit(product);
        _modal.close();
      }
    );
  }

  searchResultFormatter = (state: ProductDto) =>
    this.onlyServices
      ? `${state.name}`
      : `${state.name} - (${state.type === "Service" ? "Service" : "Product"})`;

  searchProduct = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((term) => term.length >= 2),
      map((term) =>
        this.products
          .filter((product) => new RegExp(term, "mi").test(product.name))
          .slice(0, 10)
      )
    );

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  writeValue(obj: any): void {
    if (this._elementRef.nativeElement) {
      this._renderer.setProperty(this._elementRef.nativeElement, "value", obj);
    }
    if (obj as ProductDto) {
      this.value = obj;
      setTimeout(() => {
        this.onChange(obj);
      }, 100);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = (value) => {
      return fn(value);
    };
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (this._elementRef?.nativeElement) {
      this._renderer.setProperty(
        this._elementRef.nativeElement,
        "disabled",
        isDisabled
      );
    }
  }

  private _subcribeToProducts() {
    if (this.onlyServices) {
      this._subs.add(
        this._productsFacade.servicesOnly$.subscribe((x) => (this.products = x))
      );
    } else {
      this._subs.add(
        this._productsFacade.products$.subscribe((x) => (this.products = x))
      );
    }
  }

  setFocus(): void {
    setTimeout(() => {
      if (this.setAutoFocus) {
        const _inputEl = document.getElementById(this.id);
        if (_inputEl) {
          _inputEl.focus();
        }
      }
    });
  }

  ngOnInit(): void {
    this.id = Guid.create().toString();
    this._subcribeToProducts();
    this.setFocus();
  }
}
