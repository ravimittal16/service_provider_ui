import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  CustomerDto,
  AddressDto,
  CustomerDetailModel,
} from "@shared/service-proxies/service-proxies";
import { CustomersFacade } from "@core-data/customers/customers.facade";

import { UiComponentsServiceService } from "@app/shared-ui-components/ui-components-service.service";
import { EntityTypes, AddressTypes } from "@shared/AppConsts";
import { Observable } from "rxjs";
import { SubSink } from "subsink";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-customer-edit-create-modal",
  templateUrl: "./customer-edit-create-modal.component.html",
  styleUrls: ["./customer-edit-create-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerEditCreateModalComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @Input() selectedCustomer?: CustomerDto;
  @ViewChild("titleInput") titleInput: ElementRef;
  @ViewChild("firstName") firstName: ElementRef;

  addresses: AddressDto[] = [];
  editedCustomerDetails$: Observable<CustomerDetailModel>;
  customerFormGroup: FormGroup;

  private _customerDetailModel: CustomerDetailModel;
  private subs = new SubSink();
  constructor(
    public activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder,
    private customerFacade: CustomersFacade,
    private componentsService: UiComponentsServiceService,
    private _cdr: ChangeDetectorRef
  ) {
    this.editedCustomerDetails$ = customerFacade.editedCustomerDetails$;
  }

  isForNew = () => this.selectedCustomer === null;

  openAddAddressModal(type: AddressTypes): void {
    this._openAddressModal(null, type);
  }

  private _openAddressModal(
    addressDto?: AddressDto,
    addressType: AddressTypes = AddressTypes.BUSINESS
  ): void {
    const _addressModal = this.componentsService.openAddressModal(
      addressDto,
      EntityTypes.CUSTOMER,
      addressType
    );
    _addressModal.result.then((response) => {
      if (response) {
        this.addresses.push(response);
        this._cdr.detectChanges();
      }
    });
  }

  triggerAddressAction(
    action: "edit" | "delete" | "clone",
    address: AddressDto,
    index: number
  ): void {
    if (action === "edit") {
      this._openAddressModal(address, +address.propertyType);
    }
    if (action === "delete") {
      if (this.isForNew()) {
        this.addresses.splice(index, 1);
        console.log(this.addresses);
        this._cdr.detectChanges();
      } else {
        //TODO: RUN THROUGH SERVICE
      }
    }
    if (action === "clone") {
    }
  }

  copyBusinessAsService(): void {
    if (this.addresses.length === 1) {
      const businessAddress = this.addresses.filter(
        (x) => +x.propertyType === AddressTypes.BUSINESS
      );
      if (businessAddress.length > 0) {
        var _ba = Object.assign({}, businessAddress[0]);
        _ba.propertyType = +AddressTypes.SERVICE;
        _ba.propertyName = "Service Address";
        this.addresses.push(_ba);
        this._cdr.detectChanges();
      }
    }
  }

  // ==========================================================
  // this will render a case for switch statement on UI
  // ==========================================================
  addAddressOptions(): number {
    if (this.isForNew() && this.addresses.length === 0) {
      return 0;
    }
    if (this.isForNew() && this.addresses.length === 1) {
      const hasBusinessAddress =
        this.addresses.filter((x) => +x.propertyType === AddressTypes.BUSINESS)
          .length > 0;
      if (hasBusinessAddress) return 1;
      return 2;
    }

    if (this.addresses && this.addresses.length === 2 && !this.isForNew()) {
      return -1;
    }
    return -1;
  }

  private _subscribeToEditedCustomerDetails() {
    this.subs.add(
      this.editedCustomerDetails$.subscribe((details) => {
        if (details && details.id === this.selectedCustomer.id) {
          this._customerDetailModel = details;
          this._patchFormValues(details);
        }
      })
    );
  }

  // ==========================================================
  // patching form values from edited object
  // ==========================================================

  private _patchFormValues(details: CustomerDetailModel) {
    var _keys = Object.keys(details);
    _keys.forEach((key) => {
      const _val = details[key];
      const _formControl = this.customerFormGroup.get(key);
      if (_formControl !== null && _val) {
        _formControl.patchValue(_val, { onlySelf: true });
      }
    });
    this.addresses = details.addresses;
    this._cdr.detectChanges();
    console.log(this.addresses);
  }

  onCustomerSubmitted(): void {
    console.log(this.customerFormGroup.getRawValue());
  }

  private buildForm() {
    this.customerFormGroup = this._formBuilder.group({
      displayName: ["", [Validators.required]],
      id: [0],
      givenName: [""],
      middleName: [""],
      suffix: [""],
      familyName: [""],
      title: [""],
      primaryEmailAddr: [""],
      mobile: [""],
      primaryPhone: [""],
      fax: [""],
      companyName: [""],
      alternatePhone: [""],
      webSiteAddress: [""],
    });
    this._subscribeToEditedCustomerDetails();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngAfterViewInit(): void {
    var _focusElement = this.isForNew() ? this.titleInput : this.firstName;
    setTimeout(() => {
      _focusElement.nativeElement.focus();
    });
  }
}
