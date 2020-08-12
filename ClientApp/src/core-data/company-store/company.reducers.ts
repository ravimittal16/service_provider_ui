import { CompanyDetailsModel } from "@shared/service-proxies/service-proxies";
import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { CompanyState } from "./company.state";
import * as fromCompanyActions from "./company.actions";
import { createReducer, Action, on } from "@ngrx/store";

export const companyStoreFeatureKey = "__company";

export function selectCompanyId(a: CompanyDetailsModel): string {
  return a.companyName.toString();
}

export const adapter: EntityAdapter<CompanyDetailsModel> = createEntityAdapter<
  CompanyDetailsModel
>({
  selectId: selectCompanyId,
});
export const initialState: CompanyState = adapter.getInitialState({
  businessHours: null,
  copmanyDetails: null,
  companyAddresses: null,
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
  )
);

export function reducer(state: CompanyState | undefined, action: Action) {
  return companyFeatureReducer(state, action);
}
