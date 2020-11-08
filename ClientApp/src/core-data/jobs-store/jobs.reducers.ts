import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { Action, createReducer, on } from "@ngrx/store";
import { JobsState } from "./jobs.state";
import * as jobsAction from "./jobs.actions";
import { JobDto } from "@shared/service-proxies/service-proxies";

export const jobsFeatureKey = "jobs";

export function selectJobId(job: JobDto): string {
  return job.jobId.toString();
}

export const adapter: EntityAdapter<JobDto> = createEntityAdapter<JobDto>({
  selectId: selectJobId,
});

export const initialState: JobsState = adapter.getInitialState({
  isBusy: false,
  errors: [],
  success: false,
  items: [],
  filtersModel: null,
  jobDetailsContainer: {},
  selectedJobId: 0,
  selectedJobDetails: null,
});

const jobsStoreReducer = createReducer(
  initialState,
  on(jobsAction.fetchJobDetailsCompletedAction, (state, props) => {
    const __conainer = { ...state.jobDetailsContainer };
    __conainer[props.jobId] = props.details;
    return {
      ...state,
      jobDetailsContainer: __conainer,
      isBusy: false,
      selectedJobDetails: props.details,
    };
  }),
  on(jobsAction.setSelectedJobIdAction, (state, props) => {
    return { ...state, selectedJobId: props.jobId };
  }),
  on(jobsAction.jobsLoadedAction, (state, props) => {
    const __state = adapter.addMany(props.items, state);
    return {
      ...__state,
      items: props.items,
      success: true,
    };
  })
);

export function reducer(state: JobsState | undefined, action: Action) {
  return jobsStoreReducer(state, action);
}
