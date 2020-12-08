import {
  JobFormDefinationDto,
  JobFormModel,
} from "@shared/service-proxies/service-proxies";
import { BaseState } from "@core-data/base.state";

export interface JobFormsState extends BaseState<JobFormDefinationDto> {
  jobFormDefinations: JobFormDefinationDto[];
  selectedDetails: JobFormModel;
}
