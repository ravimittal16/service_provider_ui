import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { EntityTypes, AddressTypes } from "@shared/AppConsts";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AddressDto } from "@shared/service-proxies/service-proxies";

@Component({
  selector: "app-address-modal",
  templateUrl: "./address-modal.component.html",
  styleUrls: ["./address-modal.component.scss"],
})
export class AddressModalComponent implements OnInit {
  @Input() entityType: EntityTypes;
  @Input() addressType: AddressTypes;
  addressTypes: any[] = [];
  addressFormGroup: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder
  ) {}

  // ==========================================================
  // address types can vary from Customer | Company | Vendor
  // ==========================================================
  private _buildAddressTypes() {
    if (this.entityType === EntityTypes.CUSTOMER) {
      this.addressTypes.push(
        { addressTypeId: 0, typeName: "Service" },
        { addressTypeId: 1, typeName: "Business" }
      );
    }
  }
  onAddressFormSubmit(): void {
    if (this.addressFormGroup.valid) {
      this.activeModal.close(this.addressFormGroup.getRawValue() as AddressDto);
    }
  }
  // ==========================================================
  // building address form
  // ==========================================================
  private get defaultTitle() {
    let _addressType = "";
    console.log(this.addressType);
    if (this.addressType) {
      switch (this.addressType) {
        case 0:
          _addressType = "Service";
          break;
        case AddressTypes.BUSINESS:
          _addressType = "Business";
          break;
        case AddressTypes.LEGAL:
          _addressType = "Legal";
          break;
        case AddressTypes.OTHER:
          _addressType = "Other";
          break;
        case AddressTypes.ALTERNATIVESERVICE:
          _addressType = "Alternative Service";
          break;
      }
      return `${_addressType} Address`;
    }
    return _addressType;
  }
  private _buildForm(): void {
    const _defaultTitle = this.defaultTitle;
    this.addressFormGroup = this._formBuilder.group({
      propertyName: [
        _defaultTitle,
        [Validators.required, Validators.maxLength(100)],
      ],
      addressLine1: ["", [Validators.required, Validators.maxLength(500)]],
      city: ["", [Validators.required, Validators.maxLength(100)]],
      countrySubDivisionCode: [
        "",
        [Validators.required, Validators.maxLength(100)],
      ],
      postalCode: ["", [Validators.required, Validators.maxLength(20)]],
      propertyType: [this.addressType, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this._buildAddressTypes();
    this._buildForm();
  }
}
