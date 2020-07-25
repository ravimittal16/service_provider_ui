import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { Guid } from "guid-typescript";
import { CollapsibleCardComponent } from "@app/shared-ui-components/collapsible-card/collapsible-card.component";

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
  constructor(private _formBuilder: FormBuilder) {}

  addNewTaxClicked(): void {
    this.taxes = this.taxesFormGroup.get("taxes") as FormArray;
    this.taxes.push(this.createTaxFormItem());
    if (this.collapsibleCompponent && !this.collapsibleCompponent.isExpanded) {
      this.collapsibleCompponent.expandCollapsePanel();
    }
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

  onRemoveTaxClicked(index: number) {
    console.log(index);
  }

  onDefaultTaxClicked(index: number) {
    const _group = this.taxes[index] as FormGroup;
    if (_group) {
      this._defaultTaxId = _group.get("id").value;
      console.log(this._defaultTaxId);
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
