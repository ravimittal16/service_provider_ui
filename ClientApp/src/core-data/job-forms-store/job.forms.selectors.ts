import { createFeatureSelector, createSelector } from "@ngrx/store";
import { adapter, jobFormsFeatureKey } from "./job.forms.reducers";
import { JobFormsState } from "./job.forms.state";
import * as fromRouter from "../router.reducer";

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
export const selectAllErrors = createSelector(
  jobFormsState,
  (state) => state.errors
);

// ==========================================================
// Selecting the route parameter
// ==========================================================
export const selectRouteFormId = createSelector(
  fromRouter.getRouterState,
  (routeState) => {
    return routeState && routeState.state.queryParams["__formId"];
  }
);
