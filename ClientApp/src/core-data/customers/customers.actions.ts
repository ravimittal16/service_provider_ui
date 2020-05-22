import { createAction, props } from "@ngrx/store";
import {
  CustomerDto,
  CreateCustomerModel,
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
