import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  CustomerDto,
  AddressDto,
} from "@shared/service-proxies/service-proxies";
import { CustomersFacade } from "@core-data/customers/customers.facade";

import { UiComponentsServiceService } from "@app/shared-ui-components/ui-components-service.service";
import { EntityTypes, AddressTypes } from "@shared/AppConsts";

@Component({
  selector: "app-customer-edit-create-modal",
  templateUrl: "./customer-edit-create-modal.component.html",
  styleUrls: ["./customer-edit-create-modal.component.scss"],
})
export class CustomerEditCreateModalComponent implements OnInit, AfterViewInit {
  @Input() selectedCustomer?: CustomerDto;
  addresses: AddressDto[] = [];
  @ViewChild("titleInput") titleInput: ElementRef;
  @ViewChild("firstName") firstName: ElementRef;
  constructor(
    public activeModal: NgbActiveModal,
    private customerFacade: CustomersFacade,
    private componentsService: UiComponentsServiceService
  ) {}

  isForNew = () => this.selectedCustomer === null;

  openAddAddressModal(): void {
    this._openAddressModal(null);
  }

  private _openAddressModal(
    addressDto?: AddressDto,
    addressType: AddressTypes = AddressTypes.BUSINESS
  ): void {
    const _addressModal = this.componentsService.openAddressModal(
      null,
      EntityTypes.CUSTOMER,
      AddressTypes.BUSINESS
    );
    _addressModal.result.then((response) => {
      if (response) {
        this.addresses.push(response);
      }
    });
  }

  triggerAddressAction(
    action: "edit" | "delete" | "clone",
    address: AddressDto
  ): void {
    if (action === "edit") {
      this._openAddressModal(address, +address.propertyType);
    }
  }
  // ==========================================================
  // this will render a case for switch statement on UI
  // ==========================================================
  addAddressOptions(): number {
    if (this.isForNew()) {
      return 0;
    }
    if (this.addresses && this.addresses.length === 2 && !this.isForNew()) {
      return 0;
    }
    return -1;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    var _focusElement = this.isForNew() ? this.titleInput : this.firstName;
    setTimeout(() => {
      _focusElement.nativeElement.focus();
    });
  }
}
