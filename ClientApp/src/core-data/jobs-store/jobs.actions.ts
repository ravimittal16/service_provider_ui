import { createAction, props } from "@ngrx/store";
import { JobsDto } from "./jobs.state";
export const loadJobsAction = createAction(
  "[Jobs] Load Jobs action",
  props<{}>()
);
export const jobsLoadedAction = createAction(
  "[Jobs] Loaded action",
  props<{ items: JobsDto[] }>()
);
