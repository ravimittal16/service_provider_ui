import { createAction, props } from "@ngrx/store";
import {
  CustomerDto,
  CreateCustomerModel,
  CustomerDetailModel,
} from "@shared/service-proxies/service-proxies";

export const openCreateModalAction = createAction("[Customer] Open Modal");
export const processCreateCustomerAction = createAction(
  "[Customer] Open Create Sent",
  props<{ customerModel: CreateCustomerModel }>()
);
export const createCustomerSuccessAction = createAction(
  "[Customer] Create Customer Success",
  props<{ customerModelResponse: any }>()
);
export const createCustomerErrorAction = createAction(
  "[Customer] Create Customer Error",
  props<{ errors: string[] }>()
);
export const createCustomerModalDismissedAction = createAction(
  "[Customer] Create Customer Modal Dismissed",
  props<{ dismissedResons: any }>()
);
export const createCustomerBusyStateAction = createAction(
  "[Customer] Create Customer Modal Busy State",
  props<{ isBusy: boolean }>()
);
export const loadCustomersAction = createAction(
  "[Customer] Load",
  props<{ companyId: number }>()
);
export const customersLoadedAction = createAction(
  "[Customer] Loaded",
  props<{ customers: CustomerDto[] }>()
);
export const loadCustomerErrorAction = createAction(
  "[Customer] Load Error",
  props<{ errors: any[] }>()
);

export const loadEditedCustomerDetails = createAction(
  "[Customer] Load Customer Details",
  props<{ customerId: number }>()
);

export const clearPreviousEditedDetails = createAction(
  "[Customer] Clear Previous Loaded Customer"
);

export const editedCustomerDetailsLoaded = createAction(
  "[Customer] Customer Details Loaded",
  props<{ details: CustomerDetailModel }>()
);

export const importCustomerAction = createAction("[Customer] import started");
