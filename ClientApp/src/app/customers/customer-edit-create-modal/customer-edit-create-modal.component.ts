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
  CustomerModel,
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
  errors$: Observable<string[]>;
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
    // ==========================================================
    // errors could be updated from store and manually added here
    // ==========================================================
    this.errors$ = customerFacade.errors$;
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
        if (
          details &&
          this.selectedCustomer &&
          details.id === this.selectedCustomer.id
        ) {
          this._customerDetailModel = details;
          // ==========================================================
          // patch values to form in case of edit customer
          // ==========================================================
          if (!this.isForNew()) {
            this._patchFormValues(details);
          }
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
  }

  onCustomerSubmitted(): void {
    console.log(this.customerFormGroup);
    if (this.customerFormGroup.valid) {
      var _customerDto: CustomerModel = this.customerFormGroup.getRawValue();
      if (this.addresses && this.addresses.length > 0) {
        const businessAddress = this.addresses.filter(
          (x) => +x.propertyType === AddressTypes.BUSINESS
        );
        const _sa = this.addresses.filter(
          (x) => +x.propertyType === +AddressTypes.SERVICE
        );
        if (businessAddress.length > 0) {
          _customerDto.businessAddress = Object.assign({}, businessAddress[0]);
        }
        if (_sa.length > 0) {
          _customerDto.serviceAddress = Object.assign({}, _sa[0]);
        }
      }
      this.customerFacade.saveUpdateCustomer(_customerDto);
    }
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
      primaryEmailAddr: ["", [Validators.maxLength(100)]],
      mobile: [""],
      primaryPhone: [""],
      fax: [""],
      companyName: [""],
      alternatePhone: [""],
      webSiteAddress: [""],
      sourceId: [""],
    });
    this._subscribeToEditedCustomerDetails();

    //TODO: NEED TO WRITE A WRAPPER FOR FORMS
    if (!this.isForNew()) {
      this.customerFormGroup.get("displayName").disable();
    }
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
