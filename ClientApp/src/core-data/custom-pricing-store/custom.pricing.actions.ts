import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { createAction, props } from "@ngrx/store";
import {
  IndividualPricingDto,
  IndividualPricingModel,
} from "@shared/service-proxies/service-proxies";

export const uiStateBusyAction = createAction(
  "[Custom Pricing] UI State Busy",
  props<{ isBusy: boolean }>()
);

export const updateErrorStateAction = createAction(
  "[Custom Pricing] Error state",
  props<{ errors: string[] }>()
);

export const fetchAllIndividualPricingListAction = createAction(
  "[Custom Pricing] Fetch All Individual Pricing List Action"
);
export const onFetchAllIndividualPricingListCompletedAction = createAction(
  "[Custom Pricing] Fetch All Individual Pricing List Completed Action",
  props<{ list: IndividualPricingDto[] }>()
);
// ==========================================================
// ADD UPDATE CUSTOM PRICING
// ==========================================================
export const addUpdateIndividualPricing = createAction(
  "[Custom Pricing] Add Update Individual Pricing Action",
  props<{ model: IndividualPricingModel; modal: NgbActiveModal }>()
);
export const addUpdateIndividualPricingCompletedAction = createAction(
  "[Custom Pricing] Add Update Individual Pricing Completed Action",
  props<{
    success: boolean;
    entity: IndividualPricingDto;
    isFromAdd: boolean;
  }>()
);
