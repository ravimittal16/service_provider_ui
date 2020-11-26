import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { Action, createReducer, on } from "@ngrx/store";
import { JobsState } from "./jobs.state";
import * as jobsActions from "./jobs.actions";
import { JobDto } from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";

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

function removeItem(array, action) {
  return [...array.slice(0, action.index), ...array.slice(action.index + 1)];
}

function updateObjectInArray(array, action) {
  return array.map((item, index) => {
    if (index !== action.index) {
      return item;
    }
    return {
      ...item,
      ...action.item,
    };
  });
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
  // ==========================================================
  // ON VISIT ADD COMPLETED
  // ==========================================================
  on(jobsActions.onVisitAddCompleted, (state, props) => {
    let hasItems = props.visitItems && props.visitItems.length > 0;
    if (props.visitItems && props.visitItems.length > 0) {
    }
    return {
      ...state,
      success: true,
      jobLineItems: hasItems
        ? [...state.jobLineItems, ...props.visitItems]
        : state.jobLineItems,
      jobVisits: [...state.jobVisits, props.visit],
    };
  }),
  on(jobsActions.onMarkVisitAsCompletedActionCompleted, (state, props) => {
    let __visits = state.jobVisits;
    const __current = __visits.filter((x) => x.visitId === props.visitId);
    if (__current.length > 0) {
      const __index = __visits.indexOf(__current[0]);
      const __newArray = updateObjectInArray(__visits, {
        index: __index,
        item: props.visit,
      });
      console.log(__newArray);
      __visits = __newArray;
    }
    return {
      ...state,
      success: true,
      jobVisits: __visits,
    };
  }),
  on(jobsActions.deleteVisitCompletedAction, (state, props) => {
    const items = props.deleteVisitItems
      ? state.jobLineItems.filter((x) => x.visitId !== props.visitId)
      : state.jobLineItems;
    const __visits = state.jobVisits.filter((x) => x.visitId !== props.visitId);
    return {
      ...state,
      success: props.success,
      jobVisits: __visits,
      jobLineItems: items,
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
