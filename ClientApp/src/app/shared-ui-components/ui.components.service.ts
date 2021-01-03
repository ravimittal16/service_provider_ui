import { Injectable } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import {
  AddressDto,
  ProductDto,
} from "@shared/service-proxies/service-proxies";
import { AddressModalComponent } from "./address-modal/address-modal.component";
import { EntityTypes, AddressTypes } from "@shared/AppConsts";
import { ProductSelectorModalComponent } from "./product-selector-modal/product-selector-modal.component";

@Injectable({
  providedIn: "root",
})
export class UiComponentsService {
  constructor(private modalService: NgbModal) {}

  private _modalStyle: any = {
    size: "md",
    keyboard: false,
    backdrop: "static",
  };

  openAddressModal(
    addressDto?: AddressDto,
    entityType?: EntityTypes,
    addressType?: AddressTypes
  ): NgbModalRef {
    this._modalStyle.size = "md";
    const _modal = this.modalService.open(
      AddressModalComponent,
      this._modalStyle
    );
    _modal.componentInstance.entityType = entityType;
    _modal.componentInstance.addressType = addressType;
    return _modal;
  }

  openProductSelectorModal(
    showAll: boolean,
    title: string,
    showQuantityPopover: boolean = false,
    callback?: (product: ProductDto) => void
  ) {
    this._modalStyle.size = "lg";
    const _modal = this.modalService.open(
      ProductSelectorModalComponent,
      this._modalStyle
    );
    _modal.componentInstance.showAllProducts = showAll;
    _modal.componentInstance.title = title;
    _modal.componentInstance.showQuantityPopover = showQuantityPopover;
    _modal.componentInstance.selectionCallback = callback;
    return _modal;
  }
}
