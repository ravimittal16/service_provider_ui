import { Injectable } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AddressDto } from "@shared/service-proxies/service-proxies";
import { AddressModalComponent } from "./address-modal/address-modal.component";
import { EntityTypes, AddressTypes } from "@shared/AppConsts";

@Injectable({
  providedIn: "root",
})
export class UiComponentsService {
  constructor(private modalService: NgbModal) {}
  openAddressModal(
    addressDto?: AddressDto,
    entityType?: EntityTypes,
    addressType?: AddressTypes
  ): NgbModalRef {
    const _modal = this.modalService.open(AddressModalComponent, {
      size: "md",
      keyboard: false,
      backdrop: "static",
    });
    _modal.componentInstance.entityType = entityType;
    _modal.componentInstance.addressType = addressType;
    return _modal;
  }
}
