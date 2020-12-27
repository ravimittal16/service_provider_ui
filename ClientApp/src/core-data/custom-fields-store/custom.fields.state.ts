import { BaseState } from "@core-data/base.state";
import {
  CustomFieldDefinationModel,
  CustomFieldEntityType,
  CustomFieldType,
} from "@shared/service-proxies/service-proxies";

export interface CustomFieldsState
  extends BaseState<CustomFieldDefinationModel> {
  entityTypes: CustomFieldEntityType[];
  fieldTypes: CustomFieldType[];
  selectedEntityType: CustomFieldEntityType;
}
