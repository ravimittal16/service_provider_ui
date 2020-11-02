import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AddressDto } from "@shared/service-proxies/service-proxies";

@Component({
  selector: "app-address-card",
  templateUrl: "./address-card.component.html",
  styleUrls: ["./address-card.component.scss"],
})
export class AddressCardComponent implements OnInit {
  @Input() allowEdit: boolean = false;
  @Input() allowUseThisAddress: boolean = false;
  @Input() isLastAddress: boolean = false;
  @Output() onAddressSelected: EventEmitter<AddressDto> = new EventEmitter<
    AddressDto
  >();
  @Input() address: AddressDto;
  constructor() {}
  onUseThisAddressClicked(): void {
    if (this.onAddressSelected) {
      this.onAddressSelected.emit(this.address);
    }
  }
  onEditButtonClicked(): void {}
  onMapMarkerClicked(): void {}

  ngOnInit(): void {}
}
