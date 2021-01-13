import { Component, OnDestroy, OnInit } from "@angular/core";
import { UiComponentsService } from "@app/shared-ui-components/ui.components.service";
import { CustomPricingFacade } from "@core-data/index";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IndividualPricingDto } from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";

import { SubSink } from "subsink";
import { AddUpdateIndividualPricingModalComponent } from "./add-update-individual-pricing-modal/add-update-individual-pricing-modal.component";

@Component({
  selector: "app-individual-pricing",
  templateUrl: "./individual-pricing.component.html",
  styleUrls: ["./individual-pricing.component.scss"],
})
export class IndividualPricingComponent implements OnInit, OnDestroy {
  private _subs = new SubSink();
  individualPricingList$: Observable<IndividualPricingDto[]>;
  constructor(
    private modalService: NgbModal,
    private _customPricingFacade: CustomPricingFacade
  ) {
    this.individualPricingList$ = _customPricingFacade.individualPricingList$;
  }

  onDeleteClicked(item: IndividualPricingDto) {
    console.log(item);
    this._customPricingFacade.deleteProductFromPricing(
      item.pricingId,
      item.pricingGroupId ?? 0
    );
  }

  onEditButtonClicked(item: IndividualPricingDto) {
    const modalRef = this.modalService.open(
      AddUpdateIndividualPricingModalComponent,
      {
        size: "md",
        keyboard: false,
        backdrop: "static",
      }
    );
    modalRef.componentInstance.editedModel = item;
    this._subs.add(
      modalRef.closed.subscribe((success?: boolean) => {
        if (success) {
        }
      })
    );
  }

  addProductClicked(): void {
    const modalRef = this.modalService.open(
      AddUpdateIndividualPricingModalComponent,
      {
        size: "md",
        keyboard: false,
        backdrop: "static",
      }
    );
    this._subs.add(
      modalRef.closed.subscribe((success?: boolean) => {
        if (success) {
        }
      })
    );
  }

  exportListClicked(): void {}

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  ngOnInit(): void {}
}
