import { createAction, props } from "@ngrx/store";
import {
  JobDetailsDto,
  JobDto,
  JobFilterModel,
} from "@shared/service-proxies/service-proxies";

export const loadJobsAction = createAction(
  "[Jobs] Load Jobs action",
  props<{ filters: JobFilterModel }>()
);
export const jobsLoadedAction = createAction(
  "[Jobs] Loaded action",
  props<{ items: JobDto[] }>()
);
export const jobsUpdateFiltersAction = createAction("[Jobs] Filter updated");
export const jobsLoadedErrorAction = createAction(
  "[Jobs] loaded completed success.",
  props<{ errors: string[] }>()
);

export const setSelectedJobIdAction = createAction(
  "[Jobs] Set Selected JobId",
  props<{ jobId: number }>()
);

export const fetchJobDetailsAction = createAction(
  "[Jobs] Fethcing Job Details",
  props<{ jobId: number }>()
);
export const fetchJobDetailsCompletedAction = createAction(
  "[Jobs] Details Loaded",
  props<{ details: JobDetailsDto; jobId: number }>()
);
