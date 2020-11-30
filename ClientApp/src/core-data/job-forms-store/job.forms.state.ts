import { JobFormDefinationDto } from "@shared/service-proxies/service-proxies";
import { EntityState } from "@ngrx/entity";
import { BaseState } from "@core-data/base.state";

export interface JobFormsState extends BaseState<JobFormDefinationDto> {
  jobFormDefinations: JobFormDefinationDto[];
}
