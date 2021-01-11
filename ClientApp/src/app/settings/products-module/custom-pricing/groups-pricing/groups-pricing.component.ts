import { Component, OnDestroy, OnInit } from "@angular/core";
import { CustomPricingFacade } from "@core-data/index";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PricingGroupDto } from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";
import { SubSink } from "subsink";
import { AddPricingGroupModalComponent } from "./add-pricing-group-modal/add-pricing-group-modal.component";
import { EditPricingGroupModalComponent } from "./edit-pricing-group-modal/edit-pricing-group-modal.component";

@Component({
  selector: "app-groups-pricing",
  templateUrl: "./groups-pricing.component.html",
  styleUrls: ["./groups-pricing.component.scss"],
})
export class GroupsPricingComponent implements OnInit, OnDestroy {
  private _subs = new SubSink();
  pricingGroupsList$: Observable<PricingGroupDto[]>;
  constructor(
    private modalService: NgbModal,
    private _customPricingFacade: CustomPricingFacade
  ) {
    this.pricingGroupsList$ = _customPricingFacade.pricingGroupsList$;
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  onEditButtonClicked(group: PricingGroupDto): void {
    const modalRef = this.modalService.open(EditPricingGroupModalComponent, {
      size: "lg",
      keyboard: false,
      backdrop: "static",
    });
    modalRef.componentInstance.selectedPricingGroup = group;
    this._subs.add(
      modalRef.closed.subscribe((success?: boolean) => {
        if (success) {
        }
      })
    );
  }

  onDeleteClicked(group: PricingGroupDto): void {}

  onAddPricingGroupClicked() {
    const modalRef = this.modalService.open(AddPricingGroupModalComponent, {
      size: "md",
      keyboard: false,
      backdrop: "static",
    });
    this._subs.add(
      modalRef.closed.subscribe((success?: boolean) => {
        if (success) {
        }
      })
    );
  }

  ngOnInit(): void {}
}
