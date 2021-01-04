import { Component, OnDestroy, OnInit } from "@angular/core";
import { UiComponentsService } from "@app/shared-ui-components/ui.components.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ProductDto } from "@shared/service-proxies/service-proxies";
import { AddUpdateIndividualPricingModalComponent } from "./add-update-individual-pricing-modal/add-update-individual-pricing-modal.component";

@Component({
  selector: "app-individual-pricing",
  templateUrl: "./individual-pricing.component.html",
  styleUrls: ["./individual-pricing.component.scss"],
})
export class IndividualPricingComponent implements OnInit, OnDestroy {
  constructor(
    private _uiComponentsService: UiComponentsService,
    private modalService: NgbModal
  ) {}

  addProductClicked(): void {
    const modalRef = this.modalService.open(
      AddUpdateIndividualPricingModalComponent,
      {
        size: "md",
        keyboard: false,
        backdrop: "static",
      }
    );
  }

  exportListClicked(): void {}

  ngOnDestroy(): void {
    console.log("Method not implemented.");
  }

  ngOnInit(): void {}
}
