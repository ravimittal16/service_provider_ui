import { Injectable } from "@angular/core";
import { Facade } from "@core-data/iFacade";
import { Action, select, Store } from "@ngrx/store";
import {
  JobDto,
  JobFilterModel,
} from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";
import { JobsState } from "./jobs.state";
import * as fromJobsSelectors from "./jobs.selectors";
import * as fromJobsActions from "./jobs.actions";

@Injectable({
  providedIn: "root",
})
export class JobsFacade implements Facade {
  filters$: Observable<JobFilterModel>;
  jobs$: Observable<JobDto[]>;
  constructor(private _store: Store<JobsState>) {
    this.filters$ = this._store.pipe(
      select(fromJobsSelectors.selectJobsFilter)
    );
    this.jobs$ = this._store.pipe(select(fromJobsSelectors.selectAllJobs));
  }

  loadJobs() {
    this.dispatch(fromJobsActions.loadJobsAction({ filters: null }));
  }

  dispatch(action: Action) {
    this._store.dispatch(action);
  }
}
