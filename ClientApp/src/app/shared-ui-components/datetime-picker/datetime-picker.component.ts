import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  Renderer2,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

import * as moment from "moment";

@Component({
  selector: "app-datetime-picker",
  templateUrl: "./datetime-picker.component.html",
  styleUrls: ["./datetime-picker.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatetimePickerComponent),
      multi: true,
    },
  ],
})
export class DatetimePickerComponent implements OnInit, ControlValueAccessor {
  @Input() selectorType: "date" | "time" | "datetime" = "date";
  @Input() title: string = "";
  @Input() showTitle: boolean = true;
  // ==========================================================
  // combinedWithDate will work only with time | this will combine the date&time
  // ==========================================================
  @Input() combinedWithDate?: Date;
  @Output() onChanged: EventEmitter<any> = new EventEmitter<any>();

  renderTimeSelector = false;
  onlyTimeSelector = false;
  selectedDate: NgbDateStruct | any;
  constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {}

  onChange: (_: any) => {};

  onTouched = () => {};

  writeValue(obj: Date | any): void {
    if (moment.isDate(obj)) {
      const __elValue = obj as Date;
      if (this.selectorType === "date") {
        this.selectedDate = {
          year: __elValue.getFullYear(),
          month: __elValue.getMonth() + 1,
          day: __elValue.getDate(),
        } as NgbDateStruct;
      }
      if (this.selectorType === "time") {
        console.log(obj);
      }

      this._renderer.setProperty(
        this._elementRef.nativeElement,
        "value",
        __elValue
      );
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = (value) => fn(value);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this._renderer.setProperty(
      this._elementRef.nativeElement,
      "disabled",
      isDisabled
    );
  }

  onDateSelect(event: NgbDateStruct): void {
    if (event) {
      const __newDate = new Date(
        event.year,
        event.month - 1,
        event.day,
        0,
        0,
        0
      );
      this.onChange(__newDate);
      if (this.onChanged) {
        this.onChanged.emit(__newDate);
      }
    }
  }

  ngOnInit(): void {
    this.renderTimeSelector = this.selectorType !== "date";
    this.onlyTimeSelector = this.selectorType === "time";
    console.log(this);
  }
}
