import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomerDto } from "@shared/service-proxies/service-proxies";

@Component({
  selector: "app-customer-edit-create-modal",
  templateUrl: "./customer-edit-create-modal.component.html",
  styleUrls: ["./customer-edit-create-modal.component.scss"],
})
export class CustomerEditCreateModalComponent implements OnInit {
  @Input() name;
  @Input() selectedCustomer: CustomerDto;
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
