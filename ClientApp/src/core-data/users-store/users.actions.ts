import { createAction, props } from "@ngrx/store";
import {
  CreateUserModel,
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
