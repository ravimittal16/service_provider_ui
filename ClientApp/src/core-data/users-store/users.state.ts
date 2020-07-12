import {
  ProductDto,
  UserDto,
  CreateUserModel,
} from "@shared/service-proxies/service-proxies";
import { EntityState } from "@ngrx/entity";

export interface UsersState extends EntityState<UserDto> {
  createUserModal: CreateUserModel;
  isBusy: boolean;
  errors: string[];
  companyId: number;
  success: boolean;
}
