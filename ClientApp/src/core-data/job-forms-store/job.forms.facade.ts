import { Facade } from "@core-data/iFacade";
import { Action, Store, select } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import {
  ActionReturnCode,
  JobFormDataDetailSingle,
  JobFormDefinationDto,
  JobFormModel,
} from "@shared/service-proxies/service-proxies";
import { JobFormsActionListenerSchema, JobFormsState } from "./job.forms.state";
import * as fromAllActions from "./job.forms.actions";
import * as fromAllSelectors from "./job.forms.selectors";

@Injectable({
  providedIn: "root",
})
export class JobFormsFacade implements Facade {
  errors$: Observable<string[]>;
  isBusy$: Observable<boolean>;
  formDefinations$: Observable<JobFormDefinationDto[]>;
  formDetails$: Observable<JobFormModel>;
  actionListener$: Observable<JobFormsActionListenerSchema>;
  actionReturnCode$: Observable<ActionReturnCode>;
  selectedJobFormDataDetails$: Observable<JobFormDataDetailSingle>;

  constructor(private _store: Store<JobFormsState>) {
    this.formDefinations$ = _store.pipe(
      select(fromAllSelectors.selectAllDefinations)
    );

    this.errors$ = _store.pipe(select(fromAllSelectors.selectAllErrors));
    this.formDetails$ = _store.pipe(
      select(fromAllSelectors.selectEditedJobFormDetails)
    );

    this.actionListener$ = this._store.pipe(
      select(fromAllSelectors.selectActionPayload)
    );
    this.actionReturnCode$ = this._store.pipe(
      select(fromAllSelectors.selectActionReturnCode)
    );
    this.selectedJobFormDataDetails$ = this._store.pipe(
      select(fromAllSelectors.selectedJobFormDataDetails)
    );
  }

  clearJobFormDetail() {
    this.dispatch(fromAllActions.clearFormDetailsAction());
  }

  fetchJobFormDetails(formId: number) {
    this.dispatch(fromAllActions.uiStateBusyAction({ isBusy: true }));
    this.dispatch(fromAllActions.fetchFormDetailsAction({ formId: formId }));
  }

  fetchJobFormDataDetails(jobId: number, formId: number, recordId: number) {
    this.dispatch(fromAllActions.uiStateBusyAction({ isBusy: true }));
    this.dispatch(
      fromAllActions.fetchJobFormDataDetailsAction({
        jobId: jobId,
        formId: formId,
        recordId: recordId,
      })
    );
  }

  clearEventData() {
    this.dispatch(
      fromAllActions.eventCompleteListenerAction({ payload: null })
    );
  }

  attachJobFormToJobAction(formId: number, jobid: number) {
    this.dispatch(fromAllActions.uiStateBusyAction({ isBusy: true }));
    this.dispatch(
      fromAllActions.attachJobFormToJobAction({ formId: formId, jobId: jobid })
    );
  }

  deleteJobFormAction(sectionId: number) {
    this.dispatch(fromAllActions.uiStateBusyAction({ isBusy: true }));
    this.dispatch(
      fromAllActions.deleteJobFormSectionAction({ sectionId: sectionId })
    );
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
