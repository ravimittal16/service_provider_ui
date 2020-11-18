import { createFeatureSelector, createSelector } from "@ngrx/store";
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
