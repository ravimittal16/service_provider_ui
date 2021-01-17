import {
  CustomerDto,
  CustomerModel,
  CustomerDetailModel,
} from "@shared/service-proxies/service-proxies";
import { EntityState } from "@ngrx/entity";

export interface IFilteredCustomers {
  [key: string]: CustomerDto[];
}
export interface CustomerState extends EntityState<CustomerDto> {
  model: CustomerModel;
  editedCustomerDetails: CustomerDetailModel;
  isBusy: boolean;
  errors: string[];
  companyId: number;
  success: boolean;
  selectedGroupFromModal: any;
  filteredCustomers: IFilteredCustomers;
}
