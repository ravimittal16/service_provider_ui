import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PricingGroupDto } from "@shared/service-proxies/service-proxies";

@Component({
  selector: "app-edit-pricing-group-modal",
  templateUrl: "./edit-pricing-group-modal.component.html",
  styleUrls: ["./edit-pricing-group-modal.component.scss"],
})
export class EditPricingGroupModalComponent implements OnInit {
  @Input() selectedPricingGroup: PricingGroupDto;
  constructor(private activeModal: NgbActiveModal) {}

  onCancelClicked() {
    this.activeModal.dismiss(false);
  }

  onSaveButtonClicked() {}

  ngOnInit(): void {}
}
