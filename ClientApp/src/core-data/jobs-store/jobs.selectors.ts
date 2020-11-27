import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  JobLineItemDto,
  JobVisitDto,
} from "@shared/service-proxies/service-proxies";
import { EMPTY } from "rxjs";
import { jobsFeatureKey, adapter } from "./jobs.reducers";
import { JobsState } from "./jobs.state";

export const jobsFeatureState = createFeatureSelector<JobsState>(
  jobsFeatureKey
);

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectAllJobs = createSelector(jobsFeatureState, selectAll);

export const selectJobsFilter = createSelector(
  jobsFeatureState,
  (state: JobsState) => state.filtersModel
);

export const selectJobDetails = createSelector(
  jobsFeatureState,
  (state: JobsState) => state.selectedJobDetails
);

export const selectJobLineItems = createSelector(
  jobsFeatureState,
  (state: JobsState) => state.jobLineItems
);
export const selectJobVisits = createSelector(
  jobsFeatureState,
  (state: JobsState) => state.jobVisits
);
export const selectActionPayload = createSelector(
  jobsFeatureState,
  (state: JobsState) => state.actionListenerPayload
);
export const selectVisitDetails = createSelector(
  jobsFeatureState,
  selectJobVisits,
  selectJobLineItems,
  (state: JobsState, visits: JobVisitDto[], items: JobLineItemDto[]) => {
    const __visit = visits
      ? visits.filter((x) => x.visitId === state.selectedVisitId)
      : [];
    const _items = items.filter((x) => x.visitId === state.selectedVisitId);
    console.log(__visit);
    return { visit: __visit.length > 0 ? __visit[0] : null, items: _items };
  }
);
