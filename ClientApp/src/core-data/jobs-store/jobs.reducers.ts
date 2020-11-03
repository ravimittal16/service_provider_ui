import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { Action, createReducer, on } from "@ngrx/store";
import { JobsDto, JobsState } from "./jobs.state";
import * as jobsAction from "./jobs.actions";

export const jobsFeatureKey = "jobs";

export function selectJobId(job: JobsDto): string {
  return job.jobId.toString();
}

export const adapter: EntityAdapter<JobsDto> = createEntityAdapter<JobsDto>({
  selectId: selectJobId,
});

export const initialState: JobsState = adapter.getInitialState({
  isBusy: false,
  errors: [],
  success: false,
  items: [],
});

const jobsStoreReducer = createReducer(
  initialState,
  on(jobsAction.jobsLoadedAction, (state, props) => ({
    ...state,
    items: props.items,
    success: true,
  }))
);

export function reducer(state: JobsState | undefined, action: Action) {
  return jobsStoreReducer(state, action);
}
