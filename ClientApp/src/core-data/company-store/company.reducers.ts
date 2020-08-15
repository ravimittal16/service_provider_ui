import {
  CompanyDetailsModel,
  CountryModel,
  LookupValueModel,
  CompanyBusinessHourModel,
  AddressDto,
  TimezoneModel,
  CommonDataModel,
} from "@shared/service-proxies/service-proxies";
import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { CompanyState } from "./company.state";
import * as fromCompanyActions from "./company.actions";
import { createReducer, Action, on } from "@ngrx/store";

export const companyStoreFeatureKey = "__company";

export function selectCompanyId(a: CompanyDetailsModel): string {
  return a.companyName.toString();
}

const _initialLookupValues: LookupValueModel[] = [];
const _initialCountries: CountryModel[] = [];
const _initialBusinessHours: CompanyBusinessHourModel[] = [];
const _initialCompanyAddresses: AddressDto[] = [];

export const adapter: EntityAdapter<CompanyDetailsModel> = createEntityAdapter<
  CompanyDetailsModel
>({
  selectId: selectCompanyId,
});
export const initialState: CompanyState = adapter.getInitialState({
  businessHours: _initialBusinessHours,
  copmanyDetails: {} as CompanyDetailsModel,
  companyAddresses: _initialCompanyAddresses,
  countries: _initialCountries,
  lookupValues: _initialLookupValues,
  timezones: [] as TimezoneModel[],
  commonData: {} as CommonDataModel,
  isBusy: false,
  errors: [],
  success: false,
});

const companyFeatureReducer = createReducer(
  initialState,
  on(fromCompanyActions.uiStateBusyAction, (state, props) => ({
    ...state,
    isBusy: props.isBusy,
  })),
  on(
    fromCompanyActions.companyDetailsLoadedAction,
    (state: CompanyState, props) => ({
      ...state,
      copmanyDetails: props.details,
      businessHours: props.details.businessHourModels,
      companyAddresses: props.details.compAddresses,
      isBusy: false,
      errors: [],
    })
  ),
  on(
    fromCompanyActions.commonDataLoadedAction,
    (state: CompanyState, props) => ({
      ...state,
      countries: props.commonData?.countries,
      lookupValues: props.commonData?.lookupValues,
      timezones: props.commonData?.timeZones,
    })
  )
);

export function reducer(state: CompanyState | undefined, action: Action) {
  return companyFeatureReducer(state, action);
}
