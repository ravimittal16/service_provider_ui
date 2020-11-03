import { BaseState } from "@core-data/base.state";
import { Dictionary } from "@ngrx/entity";

export class JobsDto {
  jobId: number;
}

export class JobsState extends BaseState<JobsDto> {}
