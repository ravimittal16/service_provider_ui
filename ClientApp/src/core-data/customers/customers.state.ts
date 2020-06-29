import {
  CustomerDto,
  CreateCustomerModel,
  CustomerDetailModel,
} from "@shared/service-proxies/service-proxies";
import { EntityState } from "@ngrx/entity";

export interface CustomerState extends EntityState<CustomerDto> {
  model: CreateCustomerModel;
  editedCustomerDetails: CustomerDetailModel;
  isBusy: boolean;
  errors: [];
  companyId: number;
  success: boolean;
}
