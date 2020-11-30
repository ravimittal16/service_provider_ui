import {
  CompanyDetailsModel,
  CompanyBusinessHourModel,
  AddressDto,
  CountryModel,
  LookupValueModel,
  TimezoneModel,
  CommonDataModel,
  SubscribedFeaturesDto,
  JobFormDefinationDto,
} from "@shared/service-proxies/service-proxies";
import { EntityState } from "@ngrx/entity";

export interface CompanyState extends EntityState<CompanyDetailsModel> {
  copmanyDetails: CompanyDetailsModel;
  businessHours: CompanyBusinessHourModel[];
  companyAddresses: AddressDto[];
  countries: CountryModel[];
  lookupValues: LookupValueModel[];
  timezones: TimezoneModel[];
  commonData: CommonDataModel;
  isBusy: boolean;
  errors: string[];
  success: boolean;
  features: SubscribedFeaturesDto[];
  jobFormDefinations: JobFormDefinationDto[];
}
