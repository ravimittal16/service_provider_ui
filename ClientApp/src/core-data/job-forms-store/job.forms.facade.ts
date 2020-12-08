import { Facade } from "@core-data/iFacade";
import { Action, Store, select } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import {
  JobFormDefinationDto,
  JobFormModel,
} from "@shared/service-proxies/service-proxies";
import { JobFormsState } from "./job.forms.state";
import * as fromAllActions from "./job.forms.actions";
import * as fromAllSelectors from "./job.forms.selectors";
import { first, take, takeLast } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class JobFormsFacade implements Facade {
  errors$: Observable<string[]>;
  isBusy$: Observable<boolean>;
  formDefinations$: Observable<JobFormDefinationDto[]>;
  formDetails$: Observable<JobFormModel>;
  constructor(private _store: Store<JobFormsState>) {
    this.formDefinations$ = _store.pipe(
      select(fromAllSelectors.selectAllDefinations)
    );

    this.errors$ = _store.pipe(select(fromAllSelectors.selectAllErrors));
    this.formDetails$ = _store.pipe(
      select(fromAllSelectors.selectEditedJobFormDetails)
    );
  }

  clearJobFormDetail() {
    this.dispatch(fromAllActions.clearFormDetailsAction());
  }

  fetchJobFormDetails(formId: number) {
    this.dispatch(fromAllActions.uiStateBusyAction({ isBusy: true }));
    this.dispatch(fromAllActions.fetchFormDetailsAction({ formId: formId }));
  }

  deleteJobFormDefination(jobFormId: number) {
    this.dispatch(fromAllActions.uiStateBusyAction({ isBusy: true }));
    this.dispatch(
      fromAllActions.deleteJobFormDefinationAction({ jobFormId: jobFormId })
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
