import { createAction, props } from "@ngrx/store";
export const openCreateModalAction = createAction("[Customer] Open Modal");
export const processCreateCustomerAction = createAction(
  "[Customer] Open Create Sent",
  props<{ customerModel: any }>()
);
export const createCustomerSuccessAction = createAction(
  "[Customer] Create Customer Success",
  props<{ customerModelResponse: any }>()
);
export const createCustomerErrorAction = createAction(
  "[Customer] Create Customer Error",
  props<{ customerModelResponse: any }>()
);
export const createCustomerModalDismissedAction = createAction(
  "[Customer] Create Customer Modal Dismissed",
  props<{ dismissedResons: any }>()
);
export const createCustomerBusyStateAction = createAction(
  "[Customer] Create Customer Modal Busy State",
  props<{ isBusy: boolean }>()
);
