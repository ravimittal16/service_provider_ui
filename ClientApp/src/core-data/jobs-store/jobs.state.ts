import { BaseState } from "@core-data/base.state";
import { Dictionary } from "@ngrx/entity";
import {
  JobDetailsDto,
  JobDto,
  JobFilterModel,
  JobLineItemDto,
} from "@shared/service-proxies/service-proxies";

export class JobsState extends BaseState<JobDto> {
  filtersModel: JobFilterModel;
  jobDetailsContainer: { [jobId: number]: JobDetailsDto };
  selectedJobId: number;
  selectedJobDetails: JobDetailsDto;
  jobLineItems: JobLineItemDto[];
}
