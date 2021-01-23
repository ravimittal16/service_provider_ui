import { BaseState } from "@core-data/base.state";

import {
  JobDetailsDto,
  JobDto,
  JobFilterModel,
  JobFormDto,
  JobLineItemDto,
  JobVisitDto,
} from "@shared/service-proxies/service-proxies";

export class JobActionListenerSchema {
  actionType:
    | "Delete Item"
    | "Add Item"
    | "Update Job"
    | "Delete Visit"
    | "Marked as completed";
  itemId?: number;
  jobId?: number;
  message?: string;
  success?: boolean;
  visitId?: number;
}

export class JobsState extends BaseState<JobDto> {
  filtersModel: JobFilterModel;
  jobDetailsContainer: { [jobId: number]: JobDetailsDto };
  selectedJobId: number;
  selectedJobDetails: JobDetailsDto;
  jobLineItems: JobLineItemDto[];
  jobVisits: JobVisitDto[];
  jobForms: JobFormDto[];
  actionListenerPayload: JobActionListenerSchema;
  selectedVisitId: number;
}
