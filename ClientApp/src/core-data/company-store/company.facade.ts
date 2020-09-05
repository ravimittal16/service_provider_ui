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
  constructor(private _store: Store<CompanyState>) {
    this.copmanyDetails$ = this._store.pipe(
      select(fromCompanySelectors.selectCompanyDetails)
    );
    this.businessHours$ = this._store.pipe(
      select(fromCompanySelectors.companyBusinessHoursSelector)
    );
    this.commonData$ = this._store.pipe(
      select(fromCompanySelectors.selectCommonData)
    );
  }

  loadApplicationData() {
    this.dispatch(fromCompanyActions.loadCommonDataAction());
  }

  loadCompanyDetails() {
    this.dispatch(fromCompanyActions.uiStateBusyAction({ isBusy: true }));
    this.dispatch(fromCompanyActions.loadCompanyDetailsAction());
  }

  dispatch(action: Action) {
    this._store.dispatch(action);
  }
}
