import { Component, OnInit, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-input-selector-component",
  templateUrl: "./input-selector-component.component.html",
  styleUrls: ["./input-selector-component.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectorComponentComponent),
      multi: true,
    },
  ],
})
export class InputSelectorComponentComponent
  implements OnInit, ControlValueAccessor {
  @Input() obList: Observable<any>;
  constructor() {}
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}

  ngOnInit(): void {}
}
