import { createAction, props } from "@ngrx/store";
import { IndividualPricingDto } from "@shared/service-proxies/service-proxies";

export const fetchAllIndividualPricingListAction = createAction(
  "[Custom Pricing] Fetch All Individual Pricing List Action"
);
export const onFetchAllIndividualPricingListCompletedAction = createAction(
  "[Custom Pricing] Fetch All Individual Pricing List Completed Action",
  props<{ list: IndividualPricingDto[] }>()
);
