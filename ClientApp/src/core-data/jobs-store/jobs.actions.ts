import { createAction, props } from "@ngrx/store";
import {
  CreateJobNoteModel,
  JobDetailsDto,
  JobDto,
  JobFilterModel,
  JobLineItemDto,
  JobNoteDto,
  JobVisitDto,
} from "@shared/service-proxies/service-proxies";
import { JobActionListenerSchema } from "./jobs.state";

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

export const addItemToJobCompletedAction = createAction(
  "[Jobs] Item added to Job",
  props<{ itemDto: JobLineItemDto; jobId: number }>()
);

export const deleteItemFromJob = createAction(
  "[Jobs] Delete Item",
  props<{ itemId: number; jobId: number }>()
);
export const deleteItemFromJobCompleted = createAction(
  "[Jobs] Delete Item Success",
  props<{ itemId: number; success: boolean }>()
);

export const eventCompleteListenerAction = createAction(
  "[Jobs] Actions Completed",
  props<{
    payload: JobActionListenerSchema;
  }>()
);
// ==========================================================
// VISIT ACTIONS
// ==========================================================
export const deleteVisitAction = createAction(
  "[Jobs] Delete Visit Action",
  props<{ jobId: number; visitId: number; deleteVisitItems: boolean }>()
);
export const deleteVisitCompletedAction = createAction(
  "[Jobs] Delete Visit Completed Action",
  props<{
    jobId: number;
    visitId: number;
    deleteVisitItems: boolean;
    success: boolean;
  }>()
);
export const onVisitAddCompleted = createAction(
  "[Jobs] On Visit Add Complete",
  props<{ visit: JobVisitDto; visitItems?: JobLineItemDto[] }>()
);
export const markVisitAsCompletedAction = createAction(
  "[Jobs] Mark Visit As Completed Action",
  props<{ jobId: number; visitId: number }>()
);
export const onMarkVisitAsCompletedActionCompleted = createAction(
  "[Jobs] Mark Visit As Completed Action Completed",
  props<{ visit: JobVisitDto; visitId: number }>()
);
export const prepareVisitDetailsModalAction = createAction(
  "[Jobs] Prepare Visit Details Modal Action",
  props<{ visitId: number }>()
);
// ==========================================================
// JOB NOTE ACTIONS
// ==========================================================
export const addJobNoteAction = createAction(
  "[Jobs] Add new job note action",
  props<{ model: CreateJobNoteModel }>()
);
export const addJobNoteCompletedAction = createAction(
  "[Jobs] Add new job note completed actions",
  props<{ responseDto: JobNoteDto; isSuccess: boolean }>()
);
