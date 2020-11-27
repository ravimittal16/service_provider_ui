import { Action, createReducer, on } from "@ngrx/store";
import * as fromUsersActions from "./users.actions";
import { UsersState } from "./users.state";
import { UserDto } from "@shared/service-proxies/service-proxies";
import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
export const usersFeatureKey = "users";

export function selectUserId(user: UserDto): string {
  return user.userId;
}

export const adapter: EntityAdapter<UserDto> = createEntityAdapter<UserDto>({
  selectId: selectUserId,
});

export const initialState: UsersState = adapter.getInitialState({
  companyId: 0,
  createUserModal: null,
  isBusy: false,
  errors: [],
  success: false,
  employees: [],
  teams: [],
});

const usersReducer = createReducer(
  initialState,
  on(fromUsersActions.uiStateBusyAction, (state, props) => ({
    ...state,
    isBusy: props.isBusy,
  })),
  on(fromUsersActions.userErrorsStateAction, (state, props) => ({
    ...state,
    isBusy: false,
    errors: props.errors,
  })),
  on(fromUsersActions.loaedEmployeesList, (state, props) => ({
    ...state,
    isBusy: false,
    employees: props.employees,
  })),
  on(fromUsersActions.loadedTeamsList, (state, props) => ({
    ...state,
    isBusy: false,
    teams: props.teams,
  })),
  on(fromUsersActions.modalOpenedAction, (state) => ({
    ...state,
    errors: [],
    isBusy: false,
  })),
  on(fromUsersActions.usersLoadedAction, (state, props) =>
    adapter.addMany(props.users, state)
  )
);

export function reducer(state: UsersState | undefined, action: Action) {
  return usersReducer(state, action);
}
