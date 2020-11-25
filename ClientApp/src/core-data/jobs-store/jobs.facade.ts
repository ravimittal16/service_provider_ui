import { Injectable } from "@angular/core";
import { Facade } from "@core-data/iFacade";
import { Action, select, Store } from "@ngrx/store";
import {
  JobDetailsDto,
  JobDto,
  JobFilterModel,
  JobLineItemDto,
  JobVisitDto,
} from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";
import { JobActionListenerSchema, JobsState } from "./jobs.state";
import * as fromJobsSelectors from "./jobs.selectors";
import * as fromJobsActions from "./jobs.actions";

@Injectable({
  providedIn: "root",
})
export class JobsFacade implements Facade {
  filters$: Observable<JobFilterModel>;
  jobs$: Observable<JobDto[]>;
  selectedJobDetails$: Observable<JobDetailsDto>;
  jobLineItems$: Observable<JobLineItemDto[]>;
  visits$: Observable<JobVisitDto[]>;
  actionListener$: Observable<JobActionListenerSchema>;
  constructor(private _store: Store<JobsState>) {
    this.filters$ = this._store.pipe(
      select(fromJobsSelectors.selectJobsFilter)
    );
    this.jobs$ = this._store.pipe(select(fromJobsSelectors.selectAllJobs));
    this.selectedJobDetails$ = this._store.pipe(
      select(fromJobsSelectors.selectJobDetails)
    );
    this.jobLineItems$ = this._store.pipe(
      select(fromJobsSelectors.selectJobLineItems)
    );
    this.visits$ = this._store.pipe(select(fromJobsSelectors.selectJobVisits));
    this.actionListener$ = this._store.pipe(
      select(fromJobsSelectors.selectActionPayload)
    );
  }

  fetchJobDetails(jobId: number) {
    this.dispatch(fromJobsActions.fetchJobDetailsAction({ jobId: jobId }));
  }

  onVisitAddCompleted(visit: JobVisitDto, visitItems?: JobLineItemDto[]) {
    this.dispatch(
      fromJobsActions.onVisitAddCompleted({
        visit: visit,
        visitItems: visitItems,
      })
    );
  }

  deleteVisit(visitId: number, jobId: number, deleteItems: boolean) {
    this.dispatch(
      fromJobsActions.deleteVisitAction({
        deleteVisitItems: deleteItems,
        jobId: jobId,
        visitId: visitId,
      })
    );
  }

  deleteItem(itemId: number, jobId: number) {
    this.dispatch(fromJobsActions.deleteItemFromJob({ itemId, jobId }));
  }
  clearEventData() {
    this.dispatch(
      fromJobsActions.eventCompleteListenerAction({ payload: null })
    );
  }

  loadJobs() {
    this.dispatch(fromJobsActions.loadJobsAction({ filters: null }));
  }

  lineItemAdded(item: JobLineItemDto, jobId: number) {
    this.dispatch(
      fromJobsActions.addItemToJobCompletedAction({
        itemDto: item,
        jobId: jobId,
      })
    );
  }

  dispatch(action: Action) {
    this._store.dispatch(action);
  }
}
