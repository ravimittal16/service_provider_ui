import { BaseState } from "@core-data/base.state";
import { Dictionary } from "@ngrx/entity";
import {
  JobDto,
  JobFilterModel,
} from "@shared/service-proxies/service-proxies";

export class JobsState extends BaseState<JobDto> {
  filtersModel: JobFilterModel;
}
