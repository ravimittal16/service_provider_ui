import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { Action, createReducer, on } from "@ngrx/store";
import { JobsState } from "./jobs.state";
import * as jobsActions from "./jobs.actions";
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
  jobLineItems: [],
  jobVisits: [],
  actionListenerPayload: null,
});

function insertItem(array, action) {
  return [
    ...array.slice(0, action.index),
    action.item,
    ...array.slice(action.index),
  ];
}

const jobsStoreReducer = createReducer(
  initialState,
  on(jobsActions.fetchJobDetailsCompletedAction, (state, props) => {
    return {
      ...state,
      isBusy: false,
      selectedJobDetails: props.details,
      jobLineItems: props.details?.lineItems,
      jobVisits: props.details?.jobVisits,
      success: true,
    };
  }),
  on(jobsActions.setSelectedJobIdAction, (state, props) => {
    return { ...state, selectedJobId: props.jobId };
  }),
  on(jobsActions.addItemToJobCompletedAction, (state, props) => {
    const __itemArray = insertItem(state.jobLineItems, {
      index: state.jobLineItems.length,
      item: props.itemDto,
    });
    return { ...state, isBusy: false, jobLineItems: __itemArray };
  }),
  on(jobsActions.jobsLoadedAction, (state, props) => {
    const __state = adapter.addMany(props.items, state);
    return {
      ...__state,
      items: props.items,
      success: true,
    };
  }),
  on(jobsActions.eventCompleteListenerAction, (state, props) => {
    return {
      ...state,
      actionListenerPayload: props.payload,
    };
  }),
  on(jobsActions.deleteItemFromJobCompleted, (state, props) => {
    return {
      ...state,
      jobLineItems: state.jobLineItems.filter((x) => x.itemId !== props.itemId),
      success: props.success,
    };
  })
);

export function reducer(state: JobsState | undefined, action: Action) {
  return jobsStoreReducer(state, action);
}
