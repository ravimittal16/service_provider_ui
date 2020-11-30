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
});

const createFeatureReducer = createReducer(
  initialState,
  on(fromAllActions.uiStateBusyAction, (state, props) => ({
    ...state,
    isBusy: props.isBusy,
  })),
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
