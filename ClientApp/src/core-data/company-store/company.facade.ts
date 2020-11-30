import { Facade } from "@core-data/iFacade";
import { Action, Store, select } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CompanyState } from "./company.state";
import * as fromCompanyActions from "./company.actions";
import * as fromCompanySelectors from "./company.selectors";
import {
  CompanyDetailsModel,
  CompanyBusinessHourModel,
  CommonDataModel,
  CompanyServiceProxy,
  TimezoneModel,
  CompanyDetailsModelGenericResponse,
  SubscribedFeaturesDto,
} from "@shared/service-proxies/service-proxies";

@Injectable({
  providedIn: "root",
})
export class CompanyFacade implements Facade {
  errors$: Observable<string[]>;
  isBusy$: Observable<boolean>;
  copmanyDetails$: Observable<CompanyDetailsModel>;
  commonData$: Observable<CommonDataModel>;
  businessHours$: Observable<CompanyBusinessHourModel[]>;
  features$: Observable<SubscribedFeaturesDto[]>;

  constructor(
    private _store: Store<CompanyState>,
    private companyService: CompanyServiceProxy
  ) {
    this.copmanyDetails$ = this._store.pipe(
      select(fromCompanySelectors.selectCompanyDetails)
    );
    this.businessHours$ = this._store.pipe(
      select(fromCompanySelectors.companyBusinessHoursSelector)
    );
    this.commonData$ = this._store.pipe(
      select(fromCompanySelectors.selectCommonData)
    );
    this.features$ = this._store.pipe(
      select(fromCompanySelectors.selectCompanyFeatues)
    );
  }

  updateCompanyDetails(
    details: CompanyDetailsModel
  ): Observable<CompanyDetailsModelGenericResponse> {
    return this.companyService.updateCompany(details);
  }

  loadApplicationData() {
    this.dispatch(fromCompanyActions.loadCommonDataAction());
  }

  loadCompanyDetails() {
    this.dispatch(fromCompanyActions.uiStateBusyAction({ isBusy: true }));
    this.dispatch(fromCompanyActions.loadCompanyDetailsAction());
  }

  getCountryTimezones(countryCode: string): Observable<TimezoneModel[]> {
    return this.companyService.getTimezonesList(countryCode);
  }

  getFeatues() {
    this.dispatch(
      fromCompanyActions.loadCompanySubscribedFeatues({ companyId: 0 })
    );
  }

  dispatch(action: Action) {
    this._store.dispatch(action);
  }
}
