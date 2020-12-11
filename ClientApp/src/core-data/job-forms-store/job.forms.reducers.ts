import { JobFormDefinationDto } from "@shared/service-proxies/service-proxies";
import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import { createReducer, Action, on } from "@ngrx/store";
import { JobFormsState } from "./job.forms.state";
import * as fromAllActions from "./job.forms.actions";

export const jobFormsFeatureKey = "jobforms";

export function selectCompanyId(a: JobFormDefinationDto): string {
  return a.formId.toString();
}

const _jobFormDefinations: JobFormDefinationDto[] = [];

export const adapter: EntityAdapter<JobFormDefinationDto> = createEntityAdapter<JobFormDefinationDto>(
  {
    selectId: selectCompanyId,
  }
);
export const initialState: JobFormsState = adapter.getInitialState({
  jobFormDefinations: _jobFormDefinations,
  isBusy: false,
  errors: [],
  success: false,
  items: [],
  selectedDetails: null,
  selectedFormId: 0,
  actionListenerPayload: null,
});

const createFeatureReducer = createReducer(
  initialState,
  on(fromAllActions.uiStateBusyAction, (state, props) => ({
    ...state,
    isBusy: props.isBusy,
  })),
  on(fromAllActions.updateErrorStateAction, (state, props) => ({
    ...state,
    isBusy: false,
    errors: props.errors,
  })),
  on(fromAllActions.eventCompleteListenerAction, (state, props) => {
    return {
      ...state,
      actionListenerPayload: props.payload,
    };
  }),
  on(fromAllActions.clearFormDetailsAction, (state, props) => ({
    ...state,
    isBusy: false,
    errors: [],
    selectedDetails: null,
  })),
  on(fromAllActions.formDetailsFetchedAction, (state, props) => ({
    ...state,
    isBusy: false,
    errors: [],
    success: props.isSuccess,
    selectedDetails: props.details,
    selectedFormId: props.formId,
  })),
  on(
    fromAllActions.onDeleteJobFormDefinationCompletedAction,
    (state: JobFormsState, props) => {
      if (props.isSuccess) {
        const __state = adapter.removeOne(props.jobFormId.toString(), state);
        const __jobForms = __state.jobFormDefinations.filter(
          (x) => x.formId !== props.jobFormId
        );

        return {
          ...__state,
          isBusy: false,
          jobFormDefinations: [...__jobForms],
        };
      }
    }
  ),
  on(
    fromAllActions.allJobFormDefinationsLoadedAction,
    (state: JobFormsState, props) => {
      const __state = adapter.addMany(props.definations, state);
      return {
        ...__state,
        jobFormDefinations: props.definations,
        items: props.definations,
        isBusy: false,
        errors: [],
      };
    }
  )
);

export function reducer(state: JobFormsState | undefined, action: Action) {
  return createFeatureReducer(state, action);
}
