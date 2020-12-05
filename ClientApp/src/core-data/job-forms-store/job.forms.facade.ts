import { Facade } from "@core-data/iFacade";
import { Action, Store, select } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import {
  CompanyServiceProxy,
  JobFormDefinationDto,
  JobFormModel,
} from "@shared/service-proxies/service-proxies";
import { JobFormsState } from "./job.forms.state";
import * as fromAllActions from "./job.forms.actions";
import * as fromAllSelectors from "./job.forms.selectors";
@Injectable({
  providedIn: "root",
})
export class JobFormsFacade implements Facade {
  errors$: Observable<string[]>;
  isBusy$: Observable<boolean>;
  formDefinations$: Observable<JobFormDefinationDto[]>;
  constructor(
    private _store: Store<JobFormsState>,
    private companyService: CompanyServiceProxy
  ) {
    this.formDefinations$ = _store.pipe(
      select(fromAllSelectors.selectAllDefinations)
    );
  }

  createjobForm(model: JobFormModel) {
    this.dispatch(fromAllActions.uiStateBusyAction({ isBusy: true }));
    this.dispatch(fromAllActions.createJobFormAction({ model: model }));
  }

  loadAllFormDefinations() {
    this.dispatch(fromAllActions.uiStateBusyAction({ isBusy: true }));
    this.dispatch(fromAllActions.loadAllJobFormDefinationAction());
  }

  dispatch(action: Action) {
    this._store.dispatch(action);
  }
}
