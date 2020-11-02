import { Injectable } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import {
  AddressDto,
  CustomerDto,
  CustomersServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { AddressModalComponent } from "./address-modal/address-modal.component";
import { EntityTypes, AddressTypes } from "@shared/AppConsts";
import { CustomerAddressSelectorModalComponent } from "./customer-address-selector-modal/customer-address-selector-modal.component";

@Injectable({
  providedIn: "root",
})
export class SharedDataService {
  constructor(
    private modalService: NgbModal,
    private __customerServiceProxy: CustomersServiceProxy
  ) {}

  showCustomerAddressModal(
    customer: number | CustomerDto
  ): Promise<AddressDto> {
    return new Promise((resolve, reject) => {
      const __modal = this.modalService.open(
        CustomerAddressSelectorModalComponent,
        {
          size: "md",
          keyboard: false,
          backdrop: "static",
        }
      );
      __modal.componentInstance.customerId = customer;

      __modal.result.then((value: AddressDto) => resolve(value));
    });
  }
}
