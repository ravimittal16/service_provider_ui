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
import { CustomersFacade } from "@core-data/customers/customers.facade";
import { CustomerDto } from "@shared/service-proxies/service-proxies";
import { Guid } from "guid-typescript";

import { Observable } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from "rxjs/operators";
import { SubSink } from "subsink";

@Component({
  selector: "app-customer-selector-input",
  templateUrl: "./customer-selector-input.component.html",
  styleUrls: ["./customer-selector-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomerSelectorInputComponent),
      multi: true,
    },
  ],
})
export class CustomerSelectorInputComponent
  implements OnInit, ControlValueAccessor, OnDestroy {
  @Input() lable: string = "Select Customer";
  @Input() validationMessages: { [key: string]: string } = {};
  @Input() validationMessagesKey: string = "";
  @Output() onSelectionChanged: EventEmitter<CustomerDto> = new EventEmitter<
    CustomerDto
  >();
  public value: CustomerDto;
  elementId: string;
  isDisabled = false;
  activeCustomers: CustomerDto[];
  private _subs = new SubSink();
  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    private _customerFacade: CustomersFacade
  ) {}

  onChange: (_: any) => {};

  onTouched = () => {};

  onCustomerSelectionChanged(): void {
    setTimeout(() => {
      this.onChange(this.value);
      if (this.onSelectionChanged) {
        this.onSelectionChanged.emit(this.value);
      }
    });
  }

  customerSearchFormatter = (state: CustomerDto) =>
    `${state.displayName} ${state.companyName ? "- " + state.companyName : ""}`;

  searchCustomer = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((term) => term.length >= 2),
      map((term) =>
        this.activeCustomers
          .filter((customer) =>
            new RegExp(term, "mi").test(customer.displayName)
          )
          .slice(0, 10)
      )
    );

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

  setFocus(): void {
    if (this.elementId) {
      const __el = document.getElementById(this.elementId);
      setTimeout(() => {
        __el.focus();
      });
    }
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  ngOnInit(): void {
    this.elementId = Guid.create().toString();
    this._subs.add(
      this._customerFacade.activeCustomers$.subscribe((x) => {
        if (x) {
          this.activeCustomers = x;
        }
      })
    );
  }
}
