import {
  UserDto,
  CreateUserModel,
  EmployeeDto,
  TeamDto,
} from "@shared/service-proxies/service-proxies";
import { EntityState } from "@ngrx/entity";

export interface UsersState extends EntityState<UserDto> {
  createUserModal: CreateUserModel;
  isBusy: boolean;
  errors: string[];
  companyId: number;
  success: boolean;
  employees: EmployeeDto[];
  teams: TeamDto[];
}
