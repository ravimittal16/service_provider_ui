import {
  CustomerDto,
  CreateCustomerModel,
} from "@shared/service-proxies/service-proxies";
import { EntityState } from "@ngrx/entity";

export interface CustomerState extends EntityState<CustomerDto> {
  model: CreateCustomerModel;
  isBusy: boolean;
  errors: [];
  companyId: number;
  success: boolean;
}
