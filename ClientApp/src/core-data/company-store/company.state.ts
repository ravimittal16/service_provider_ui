import {
  CompanyDetailsModel,
  CompanyBusinessHourModel,
} from "@shared/service-proxies/service-proxies";
import { EntityState } from "@ngrx/entity";

export interface CompanyState extends EntityState<CompanyDetailsModel> {
  copmanyDetails: CompanyDetailsModel;
  businessHours: CompanyBusinessHourModel[];
  isBusy: boolean;
  errors: string[];
  success: boolean;
}
