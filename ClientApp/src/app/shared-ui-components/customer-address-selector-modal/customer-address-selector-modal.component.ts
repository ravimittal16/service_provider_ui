import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-customer-address-selector-modal",
  templateUrl: "./customer-address-selector-modal.component.html",
  styleUrls: ["./customer-address-selector-modal.component.scss"],
})
export class CustomerAddressSelectorModalComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}
}
