import { Component, Input, OnInit } from "@angular/core";
import { AddressDto } from "@shared/service-proxies/service-proxies";

@Component({
  selector: "app-address-card",
  templateUrl: "./address-card.component.html",
  styleUrls: ["./address-card.component.scss"],
})
export class AddressCardComponent implements OnInit {
  @Input() allowEdit: boolean = false;
  @Input() address: AddressDto;
  constructor() {}

  onEditButtonClicked(): void {}
  onMapMarkerClicked(): void {}

  ngOnInit(): void {}
}
