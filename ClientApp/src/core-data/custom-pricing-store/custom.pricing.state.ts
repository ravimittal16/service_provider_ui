import { BaseState } from "@core-data/base.state";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
  ActionReturnCode,
  IndividualPricingDto,
  PricingGroupDetailDto,
  PricingGroupDto,
} from "@shared/service-proxies/service-proxies";

export interface GroupPricingState extends BaseState<PricingGroupDto> {
  modalRef: NgbActiveModal;
  selectGroupId: number;
  selecteGroupDetails: PricingGroupDetailDto;
}
export interface IndividualPricingState
  extends BaseState<IndividualPricingDto> {
  modalRef: NgbActiveModal;
}

export interface CustomPricingStoreState {
  isBusy: boolean;
  errors: [];
  isSuccess: boolean;
  actionReturnCode: ActionReturnCode;
  individualPricingState: IndividualPricingState;
  groupPricingState: GroupPricingState;
}
