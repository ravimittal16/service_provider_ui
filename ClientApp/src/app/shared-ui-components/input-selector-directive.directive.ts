import {
  Directive,
  OnInit,
  ElementRef,
  Input,
  forwardRef,
  Renderer2,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import Choices from "choices.js";

@Directive({
  selector: "select[choices]",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectorDirectiveDirective),
      multi: true,
    },
  ],
})
export class InputSelectorDirectiveDirective
  implements OnInit, ControlValueAccessor {
  private __maxIntervalCheckCount = 30;
  private choices: Choices;
  private _parentEl: HTMLElement;
  @Input() isObservableList: boolean = false;
  constructor(private _renderer: Renderer2, private el: ElementRef) {}
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {
    this._renderer.setProperty(
      this.el.nativeElement,
      "disabled",
      isDisabled ? "disabled" : null
    );
    if (this.choices && this.el.nativeElement) {
      if (isDisabled) {
        this.choices.disable();
        this.choices.clearInput();
        if (this._parentEl) {
          const __labelEl = this._parentEl.getElementsByClassName(
            "choices__list choices__list--single"
          );
          if (__labelEl) {
            this._renderer.setProperty(__labelEl.item(0), "innerText", "");
          }
        }
      } else {
        this.choices.enable();
      }
    }
  }

  ngOnInit(): void {
    let __counter = 1;
    if (this.el) {
      this._parentEl = this.el.nativeElement.parentElement;

      const __interval = setInterval(() => {
        const __length = (this.el.nativeElement as HTMLSelectElement).options
          .length;
        if (__length > 1 || __counter >= this.__maxIntervalCheckCount) {
          if (__length > 1) {
            this.choices = new Choices(this.el.nativeElement, {
              placeholder: true,
              removeItemButton: false,
            });
          }
          clearInterval(__interval);
        }
        __counter += 1;
      }, 100);
    }
  }
}
