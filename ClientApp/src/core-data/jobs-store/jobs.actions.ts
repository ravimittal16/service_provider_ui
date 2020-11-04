import { createAction, props } from "@ngrx/store";
import {
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
