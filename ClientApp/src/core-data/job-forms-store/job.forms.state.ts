import {
  JobFormDataDetailSingle,
  JobFormDefinationDto,
  JobFormModel,
} from "@shared/service-proxies/service-proxies";
import { BaseState } from "@core-data/base.state";

export class JobFormsActionListenerSchema {
  actionType:
    | "Add Job Form"
    | "Update Job Form"
    | "Deleted Section"
    | "Deleted Form Field"
    | "Deleted Form";
  sectionId?: number;
  formId?: number;
  message?: string;
  success?: boolean;
  fieldId?: number;
}

export interface JobFormsState extends BaseState<JobFormDefinationDto> {
  jobFormDefinations: JobFormDefinationDto[];
  selectedDetails: JobFormModel;
  actionListenerPayload: JobFormsActionListenerSchema;
  selectedJobFormDataDetails: JobFormDataDetailSingle;
}
