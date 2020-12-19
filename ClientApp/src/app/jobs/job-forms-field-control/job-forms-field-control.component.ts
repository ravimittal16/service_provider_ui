import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  Renderer2,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { FieldTypes } from "@shared/AppConsts";

import { Field } from "@shared/service-proxies/service-proxies";

@Component({
  selector: "app-job-forms-field-control",
  templateUrl: "./job-forms-field-control.component.html",
  styleUrls: ["./job-forms-field-control.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => JobFormsFieldControlComponent),
      multi: true,
    },
  ],
})
export class JobFormsFieldControlComponent
  implements OnInit, ControlValueAccessor {
  @Input() fieldProps: Field;
  fieldValue: string | boolean | Date;

  valueSource: string[] = [];
  constructor(private renderer: Renderer2, private elRef: ElementRef) {}
  onChange: (_: any) => {};

  onTouched = () => {};

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {
    this.onChange = (value) => fn(value);
  }
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}

  onValueChanged(event: any) {
    this.onChange(this.fieldValue);
  }

  onDateSelect($event: any) {}

  ngOnInit(): void {
    const __fieldType = this.fieldProps.fieldType as number;
    if (
      this.fieldProps &&
      __fieldType === FieldTypes.CHOOSEONE &&
      this.fieldProps.valueSource
    ) {
      this.valueSource = this.fieldProps.valueSource.split(",");
    }
  }
}
