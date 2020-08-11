import { Facade } from "@core-data/iFacade";
import { Action, Store, select } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CompanyState } from "./company.state";
import * as fromCompanyActions from "./company.actions";
import * as fromCompanySelectors from "./company.selectors";
import { CompanyDetailsModel } from "@shared/service-proxies/service-proxies";

@Injectable({
  providedIn: "root",
})
export class CompanyFacade implements Facade {
  errors$: Observable<string[]>;
  isBusy$: Observable<boolean>;
  copmanyDetails$: Observable<CompanyDetailsModel>;
  constructor(private _store: Store<CompanyState>) {
    this.copmanyDetails$ = this._store.pipe(
      select(fromCompanySelectors.selectCompanyDetails)
    );
  }

  loadCompanyDetails() {
    this.dispatch(fromCompanyActions.uiStateBusyAction({ isBusy: true }));
    this.dispatch(fromCompanyActions.loadCompanyDetailsAction());
  }
  dispatch(action: Action) {
    this._store.dispatch(action);
  }
}
