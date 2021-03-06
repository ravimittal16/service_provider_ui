import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomPricingFacade } from "@core-data/index";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
  IndividualPricingModel,
  ProductDto,
} from "@shared/service-proxies/service-proxies";

@Component({
  selector: "app-add-update-individual-pricing-modal",
  templateUrl: "./add-update-individual-pricing-modal.component.html",
  styleUrls: ["./add-update-individual-pricing-modal.component.scss"],
})
export class AddUpdateIndividualPricingModalComponent implements OnInit {
  @ViewChild("unitPriceInput") unitPriceInputElRef: ElementRef;
  @Input() editedModel?: IndividualPricingModel;
  @Input() pricingGroupId: number;
  pricingFormGroup: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _activeModal: NgbActiveModal,
    private _customPricingFacade: CustomPricingFacade
  ) {}

  onCancelClicked() {
    this._activeModal.dismiss();
  }

  onSaveButtonClicked() {
    if (this.pricingFormGroup.valid) {
      const __model: IndividualPricingModel = this.pricingFormGroup.getRawValue();
      this._customPricingFacade.addUpdateIndividualPricing(
        __model,
        this._activeModal
      );
    }
  }

  onItemSelectionChanged(product: ProductDto) {
    if (product) {
      this.pricingFormGroup.get("productId").patchValue(product.productId);
      this.pricingFormGroup.get("actualPrice").patchValue(product.unitPrice);
      setTimeout(() => {
        if (
          this.unitPriceInputElRef &&
          this.unitPriceInputElRef.nativeElement
        ) {
          this.unitPriceInputElRef.nativeElement.focus();
        }
      }, 100);
    }
  }

  private __initFormGroup() {
    this.pricingFormGroup = this._fb.group({
      pricingId: [0],
      actualPrice: [0],
      pricingGroupId: [this.pricingGroupId],
      unitPrice: [0, [Validators.required]],
      productId: [null, [Validators.required]],
      product: [null, [Validators.required]],
    });
    if (this.editedModel) {
      console.log(this.editedModel);
      this.pricingFormGroup.get("product").disable();
    }
  }

  ngOnInit(): void {
    this.__initFormGroup();
  }
}
