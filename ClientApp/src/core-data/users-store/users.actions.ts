import { createAction, props } from "@ngrx/store";
import {
  CreateUserModel,
  EmployeeDto,
  TeamDto,
  UserDto,
} from "@shared/service-proxies/service-proxies";

export const modalOpenedAction = createAction("[Users] Modal Opened");
export const uiStateBusyAction = createAction(
  "[Users] UI State Busy",
  props<{ isBusy: boolean }>()
);
export const userErrorsStateAction = createAction(
  "[Users] On Errors",
  props<{ errors: string[] }>()
);
// ==========================================================
// USERS LOAD ACTION
// ==========================================================
export const loadUsersAction = createAction("[Users] Load Users");
export const usersLoadedAction = createAction(
  "[Users] Loaded",
  props<{ users: UserDto[] }>()
);
// ==========================================================
// CREATE AND EDIT USER
// ==========================================================
export const createUserStartAction = createAction(
  "[Users] Create/Update User Started",
  props<{ model: CreateUserModel }>()
);
export const createUserStartCompleted = createAction(
  "[Users] Create/Update User Completed",
  props<{ errors: string[]; isSuccess: boolean }>()
);
// ==========================================================
// OTHER RELATED DATA
// ==========================================================

export const loadEmployeesAction = createAction(
  "[Users] Load Employees List",
  props<{ companyId: number }>()
);
export const loaedEmployeesList = createAction(
  "[Users] Employees list loaded",
  props<{ employees: EmployeeDto[] }>()
);
export const loadTeamsAction = createAction("[Users] Load Teams List");
export const loadedTeamsList = createAction(
  "[Users] Teams list loaded",
  props<{ teams: TeamDto[] }>()
);
