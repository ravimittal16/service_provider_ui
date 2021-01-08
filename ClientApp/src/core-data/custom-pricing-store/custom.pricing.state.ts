import { BaseState } from "@core-data/base.state";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
  IndividualPricingDto,
  PricingGroupDto,
} from "@shared/service-proxies/service-proxies";

export interface GroupPricingState extends BaseState<PricingGroupDto> {
  modalRef: NgbActiveModal;
}
export interface IndividualPricingState
  extends BaseState<IndividualPricingDto> {
  modalRef: NgbActiveModal;
}

export interface CustomPricingStoreState {
  isBusy: boolean;
  errors: [];
  isSuccess: boolean;
  individualPricingState: IndividualPricingState;
  groupPricingState: GroupPricingState;
}
