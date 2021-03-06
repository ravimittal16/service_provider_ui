import { Component, Input, OnInit } from "@angular/core";
import { UiComponentsService } from "@app/shared-ui-components/ui.components.service";
import { CustomPricingFacade } from "@core-data/index";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  CustomerDto,
  IndividualPricingDto,
  PricingGroupCustomerDto,
  PricingGroupDetailDto,
  PricingGroupDto,
} from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";
import { SubSink } from "subsink";
import { AddUpdateIndividualPricingModalComponent } from "../../individual-pricing/add-update-individual-pricing-modal/add-update-individual-pricing-modal.component";

@Component({
  selector: "app-edit-pricing-group-modal",
  templateUrl: "./edit-pricing-group-modal.component.html",
  styleUrls: ["./edit-pricing-group-modal.component.scss"],
})
export class EditPricingGroupModalComponent implements OnInit {
  @Input() selectedPricingGroup: PricingGroupDto;
  private _subs = new SubSink();
  groupDetails$: Observable<PricingGroupDetailDto>;
  errors$: Observable<string[]>;
  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private _customPricingFacade: CustomPricingFacade,
    private _uiComponentService: UiComponentsService
  ) {
    this.groupDetails$ = _customPricingFacade.selectGroupDetails$;
    this.errors$ = _customPricingFacade.errors$;
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
    modalRef.componentInstance.pricingGroupId = this.pricingGroupId;
    this._subs.add(
      modalRef.closed.subscribe((success?: boolean) => {
        if (success) {
        }
      })
    );
  }

  get pricingGroupId() {
    return this.selectedPricingGroup.pricingGroupId;
  }

  openCustomerModal() {
    const __modal = this._uiComponentService.openCustomSelectorModal(
      (customer: CustomerDto) => {
        this._customPricingFacade.addCustomerToPricingGroup(
          customer.id,
          this.pricingGroupId
        );
      }
    );
  }

  onDeleteCustomerClicked(customer: PricingGroupCustomerDto) {
    this._customPricingFacade.deleteCustomerFromPricing(
      customer.customerId,
      this.selectedPricingGroup.pricingGroupId
    );
  }

  onDeleteClicked(item: IndividualPricingDto) {
    this._customPricingFacade.deleteProductFromPricing(
      item.pricingId,
      item.pricingGroupId
    );
  }

  onEditButtonClicked(item: IndividualPricingDto) {}

  onCancelClicked() {
    this.activeModal.dismiss(false);
  }

  onSaveButtonClicked() {}

  ngOnInit(): void {
    this._customPricingFacade.fetchGroupDetails(
      this.selectedPricingGroup?.pricingGroupId
    );
  }
}
