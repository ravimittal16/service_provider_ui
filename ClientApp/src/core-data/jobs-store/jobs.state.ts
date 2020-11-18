import { BaseState } from "@core-data/base.state";
import { Dictionary } from "@ngrx/entity";
import {
  JobDetailsDto,
  JobDto,
  JobFilterModel,
  JobLineItemDto,
  JobVisitDto,
} from "@shared/service-proxies/service-proxies";

export class JobActionListenerSchema {
  actionType: "Delete Item" | "Add Item" | "Update Job";
  itemId?: number;
  jobId?: number;
  message?: string;
  success?: boolean;
}

export class JobsState extends BaseState<JobDto> {
  filtersModel: JobFilterModel;
  jobDetailsContainer: { [jobId: number]: JobDetailsDto };
  selectedJobId: number;
  selectedJobDetails: JobDetailsDto;
  jobLineItems: JobLineItemDto[];
  jobVisits: JobVisitDto[];
  actionListenerPayload: JobActionListenerSchema;
}
