import {
  Component,
  ElementRef,
  forwardRef,
  OnInit,
  Renderer2,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import Choices from "choices.js";
import { Guid } from "guid-typescript";

@Component({
  selector: "app-custom-items-input",
  templateUrl: "./custom-items-input.component.html",
  styleUrls: ["./custom-items-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomItemsInputComponent),
      multi: true,
    },
  ],
})
export class CustomItemsInputComponent implements OnInit, ControlValueAccessor {
  private choices: Choices;
  private __inputElement: HTMLElement;
  private __defaultValues: string;
  constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {}
  elementId: string;
  onChange: (_: any) => {};

  onTouched = () => {};
  writeValue(obj: any): void {
    if (obj) {
      this.__defaultValues = obj;
    }
  }
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}

  private __setChoicesElement() {
    setTimeout(() => {
      this.__inputElement = document.getElementById(this.elementId);
      console.log(this.__inputElement);
      this.choices = new Choices(this.__inputElement as HTMLInputElement, {
        items: this.__defaultValues.split(","),
        delimiter: ",",
        editItems: true,
        maxItemCount: 10,
        removeItemButton: true,
      });
    }, 100);
  }

  ngOnInit(): void {
    this.elementId = Guid.create().toString();
    if (this._elementRef.nativeElement) {
      this.__setChoicesElement();
    }
  }
}
