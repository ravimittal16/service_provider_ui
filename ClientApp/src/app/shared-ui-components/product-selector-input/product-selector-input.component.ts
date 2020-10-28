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
import { Observable } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from "rxjs/operators";
import { SubSink } from "subsink";

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
  @Output() onSelectionChanged: EventEmitter<ProductDto> = new EventEmitter<
    ProductDto
  >();

  public value: ProductDto;
  services: ProductDto[];
  private _subs = new SubSink();

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    private _productsFacade: ProductsFacade
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

  searchResultFormatter = (state: ProductDto) => `${state.name}`;

  searchProduct = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((term) => term.length >= 2),
      map((term) =>
        this.services
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

  ngOnInit(): void {
    this._subs.add(
      this._productsFacade.servicesOnly$.subscribe((x) => (this.services = x))
    );
  }
}
