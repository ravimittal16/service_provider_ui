import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { createAction, props } from "@ngrx/store";
import {
  ActionReturnCode,
  IndividualPricingDto,
  IndividualPricingModel,
  PricingGroupCustomerDtoGenericResponse,
  PricingGroupDetailDto,
  PricingGroupDto,
  PricingGroupModel,
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
    forGroupPricing: boolean;
  }>()
);
// ==========================================================
// GROUP PRICING ACTION
// ==========================================================
export const fetchAllPricingGrpupsAction = createAction(
  "[Custom Pricing] fetch All pricing groups."
);
export const fetchAllPricingGroupCompletedAction = createAction(
  "[Custom Pricing] Fetch All groups completed action",
  props<{ groups: PricingGroupDto[] }>()
);
// ==========================================================
// ADD PRICING GROUP
// ==========================================================
export const addUpdatePricingGrpup = createAction(
  "[Custom Pricing] Add Update Pricing Group Action",
  props<{ model: PricingGroupModel; modal: NgbActiveModal }>()
);
export const addUpdatePricingGrpupCompletedAction = createAction(
  "[Custom Pricing] Add Update Pricing Group Completed Action",
  props<{
    success: boolean;
    entity: PricingGroupDto;
    isFromAdd: boolean;
  }>()
);
export const fetchPricingGroupDetailsAction = createAction(
  "[Custom Pricing] Fetch pricing group details action.",
  props<{ pricingGroupId: number }>()
);
export const fetchPricingGroupDetailCompletedAction = createAction(
  "[Custom Pricing] Fetch pricing group details completed action.",
  props<{ details: PricingGroupDetailDto }>()
);
export const deleteProductFromPricingAction = createAction(
  "[Custom Pricing] Delete Product from Pricing event.",
  props<{ pricingId: number; pricingGroupId: number }>()
);
export const deleteProductFromPricingCompletedAction = createAction(
  "[Custom Pricing] Delete Product from Pricing Completed event.",
  props<{
    returnCode: ActionReturnCode;
    isSuccess: boolean;
    pricingId: number;
    forGroupPricing: boolean;
  }>()
);
// ==========================================================
// ADD UPDATE CUSTOM TO PRICING GROUP
// ==========================================================
export const addUpdateCustomerToPricingGroupAction = createAction(
  "[Custom Pricing] Add Update Custom to pricing group",
  props<{ customerId: number; pricingGroupId: number }>()
);

export const addUpdateCustomerToPricingGroupCompletedAction = createAction(
  "[Custom Pricing] Add Update Custom to pricing group Completed event.",
  props<{
    response: PricingGroupCustomerDtoGenericResponse;
    isSuccess: boolean;
  }>()
);
export const deleteCustomerFromPricingGroupAction = createAction(
  "[Custom Pricing] Delete customer from pricing group action.",
  props<{ customerId: number; pricingGroupId: number }>()
);
export const deleteCustomerFromPricingGroupCompletedAction = createAction(
  "[Custom Pricing] Delete customer from pricing group completed action.",
  props<{
    pricingGroupId: number;
    customerId: number;
    actionReturnCode: ActionReturnCode;
    isSuccess: boolean;
  }>()
);
