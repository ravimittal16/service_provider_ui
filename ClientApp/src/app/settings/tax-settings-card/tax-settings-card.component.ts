import { Component, OnInit, ViewChild, ɵConsole } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { Guid } from "guid-typescript";
import { CollapsibleCardComponent } from "@app/shared-ui-components/collapsible-card/collapsible-card.component";

import { Observable, from, of, BehaviorSubject } from "rxjs";

@Component({
  selector: "app-tax-settings-card",
  templateUrl: "./tax-settings-card.component.html",
  styleUrls: ["./tax-settings-card.component.scss"],
})
export class TaxSettingsCardComponent implements OnInit {
  @ViewChild("collapsibleCompponent")
  collapsibleCompponent: CollapsibleCardComponent;
  taxesFormGroup: FormGroup;
  taxes: FormArray;
  _defaultTaxId: string;
  private errorsSubject = new BehaviorSubject<string[]>([]);
  errors$: Observable<string[]>;
  isStateValid = true;
  constructor(private _formBuilder: FormBuilder) {
    this.errors$ = this.errorsSubject.asObservable();
  }

  private __getField(fieldName: string): AbstractControl {
    return this.taxesFormGroup.get(fieldName);
  }

  showInvalidStateMessage() {
    this.isStateValid = false;
    this.errorsSubject.next([
      "Please make sure all tax-rates has been defined.",
    ]);
    this.__expandTaxContainer();
  }

  private __expandTaxContainer(): void {
    if (this.collapsibleCompponent && !this.collapsibleCompponent.isExpanded) {
      this.collapsibleCompponent.expandCollapsePanel();
    }
  }

  addNewTaxClicked(): void {
    if (this.taxes.controls.length < 5) {
      this.taxes = this.__getField("taxes") as FormArray;
      this.taxes.push(this.createTaxFormItem());
      this.__expandTaxContainer();
      setTimeout(() => {
        if (this.taxes.length === 1) {
          const _firstGroup = this.taxes.controls[0];
          if (_firstGroup) {
            const _id = _firstGroup.get("id").value;
            _firstGroup.get("defaultTaxId").patchValue(_id);
          }
        }
      }, 10);
    }
  }

  isValidTaxRatesForms(): Promise<{
    isValid: boolean;
    errors: any[];
    formData?: any;
  }> {
    this.errorsSubject.next(null);
    return new Promise((resolve, reject) => {
      const __array = this.__getField("taxes") as FormArray;
      if (__array.controls.length > 0) {
        const __invalidFormData = __array.controls.filter((x) => x.invalid);
        const __formData = this.taxesFormGroup.getRawValue();

        resolve({
          isValid: __invalidFormData.length === 0,
          errors: [],
          formData: __formData,
        });
      } else {
        resolve({ isValid: true, errors: [] });
      }
    });
  }

  onRemoveTaxClicked(index: number) {
    this.errorsSubject.next(null);
    const formGroup = this.taxes.controls[index];
    if (formGroup) {
      const isSaved = formGroup.get("isSaved").value as boolean;
      if (isSaved) {
        // ==========================================================
        // From database
        // ==========================================================
      } else {
        this.taxes.controls.splice(index, 1);
      }
    }
  }

  onDefaultTaxClicked(index: number) {
    const __array = this.__getField("taxes") as FormArray;
    const _group = __array.controls[index] as FormGroup;
    if (_group) {
      this._defaultTaxId = _group.get("id").value;
      for (let __i = 0; __i < __array.controls.length; __i++) {
        const __isDefault =
          _group.get("id").value === __array.controls[__i].get("id").value;
        __array.controls[__i]
          .get("defaultTaxId")
          .patchValue(_group.get("id").value);
        __array.controls[__i].get("isDefault").patchValue(__isDefault);
      }
    }
  }

  createTaxFormItem(): FormGroup {
    const _id = Guid.create().toString();
    return this._formBuilder.group({
      id: [_id],
      taxName: ["", [Validators.required]],
      taxRate: [0, [Validators.required]],
      taxDescription: [""],
      isActive: [false],
      defaultTaxId: [""],
      isSaved: [false],
      isDefault: [false],
    });
  }

  private _initFormControl() {
    this.taxesFormGroup = this._formBuilder.group({
      taxIdName: [""],
      taxIdNumber: [""],
      taxes: this._formBuilder.array([]),
    });
    this.taxes = this.taxesFormGroup.get("taxes") as FormArray;
  }

  ngOnInit(): void {
    this._initFormControl();
  }
}
