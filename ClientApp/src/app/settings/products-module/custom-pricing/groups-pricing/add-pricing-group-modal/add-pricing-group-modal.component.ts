import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomPricingFacade } from "@core-data/index";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PricingGroupModel } from "@shared/service-proxies/service-proxies";

@Component({
  selector: "app-groups-pricingadd-pricing-group-modal",
  templateUrl: "./add-pricing-group-modal.component.html",
  styleUrls: ["./add-pricing-group-modal.component.scss"],
})
export class AddPricingGroupModalComponent implements OnInit {
  pricingFormGroup: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _activeModal: NgbActiveModal,
    private _customPricingFacade: CustomPricingFacade
  ) {}

  onCancelClicked(): void {
    this._activeModal.dismiss();
  }

  onSaveButtonClicked(): void {
    if (this.pricingFormGroup.valid) {
      const _model: PricingGroupModel = this.pricingFormGroup.getRawValue();
      this._customPricingFacade.addUpdatePricingGroup(
        _model,
        this._activeModal
      );
    }
  }

  private _initFormGroup(): void {
    this.pricingFormGroup = this._fb.group({
      pricingGroupId: [0],
      groupName: ["", [Validators.required, Validators.maxLength(500)]],
    });
  }

  ngOnInit(): void {
    this._initFormGroup();
  }
}
