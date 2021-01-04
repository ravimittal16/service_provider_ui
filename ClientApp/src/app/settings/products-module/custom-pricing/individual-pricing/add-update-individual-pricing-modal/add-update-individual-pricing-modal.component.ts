import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ProductDto } from "@shared/service-proxies/service-proxies";

@Component({
  selector: "app-add-update-individual-pricing-modal",
  templateUrl: "./add-update-individual-pricing-modal.component.html",
  styleUrls: ["./add-update-individual-pricing-modal.component.scss"],
})
export class AddUpdateIndividualPricingModalComponent implements OnInit {
  pricingFormGroup: FormGroup;
  constructor(private _fb: FormBuilder, private _activeModal: NgbActiveModal) {}

  onCancelClicked() {
    this._activeModal.dismiss();
  }

  onSaveButtonClicked() {}

  onItemSelectionChanged($eventDetails: ProductDto) {}

  private __initFormGroup() {
    this.pricingFormGroup = this._fb.group({
      pricingId: [0],
      unitPrice: [0, [Validators.required]],
      productId: [null, [Validators.required]],
      product: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.__initFormGroup();
  }
}
