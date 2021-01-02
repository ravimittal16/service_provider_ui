import { BaseState } from "@core-data/base.state";
import {
  CustomFieldDto,
  CustomFieldEntityType,
  CustomFieldType,
} from "@shared/service-proxies/service-proxies";

export interface CustomFieldsState extends BaseState<CustomFieldDto> {
  entityTypes: CustomFieldEntityType[];
  fieldTypes: CustomFieldType[];
  selectedEntityType: CustomFieldEntityType;
  customFields: CustomFieldDto[];
  totalCustomFields: 0;
}
