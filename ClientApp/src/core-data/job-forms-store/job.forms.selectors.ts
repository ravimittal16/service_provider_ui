import { createFeatureSelector, createSelector } from "@ngrx/store";
import { adapter, jobFormsFeatureKey } from "./job.forms.reducers";
import { JobFormsState } from "./job.forms.state";

export const jobFormsState = createFeatureSelector<JobFormsState>(
  jobFormsFeatureKey
);

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectAllDefinations = createSelector(jobFormsState, selectAll);
