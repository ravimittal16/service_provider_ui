import {
  CompanyDetailsModel,
  CompanyBusinessHourModel,
  AddressDto,
} from "@shared/service-proxies/service-proxies";
import { EntityState } from "@ngrx/entity";

export interface CompanyState extends EntityState<CompanyDetailsModel> {
  copmanyDetails: CompanyDetailsModel;
  businessHours: CompanyBusinessHourModel[];
  companyAddresses: AddressDto[];
  isBusy: boolean;
  errors: string[];
  success: boolean;
}
