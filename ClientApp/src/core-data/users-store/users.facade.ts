import { Facade } from "@core-data/iFacade";
import { Injectable } from "@angular/core";
import { Action, Store, select } from "@ngrx/store";
import {
  UserDto,
  CreateUserModel,
  EmployeeDto,
  TeamDto,
} from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";
import { UsersState } from "./users.state";
import * as fromUsersActions from "./users.actions";
import * as fromUsersSelectors from "./users.selectors";
import { tap } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class UsersFacade implements Facade {
  errors$: Observable<string[]>;
  isBusy$: Observable<boolean>;
  users$: Observable<UserDto[]>;
  employees$: Observable<EmployeeDto[]>;
  teams$: Observable<TeamDto[]>;

  constructor(private _store: Store<UsersState>) {
    this.users$ = this._store.pipe(select(fromUsersSelectors.selectAllUsers));
    this.isBusy$ = this._store.pipe(
      select(fromUsersSelectors.usersBusyStateSelector)
    );
    this.errors$ = this._store.pipe(select(fromUsersSelectors.selectErrors));
    this.employees$ = this._store.pipe(
      select(fromUsersSelectors.selectEmployeesList)
    );
    this.teams$ = this._store.pipe(select(fromUsersSelectors.selectTeamsList));
  }

  onUserModalOpened() {
    this.dispatch(fromUsersActions.modalOpenedAction());
  }

  fetchEmloyeesList() {
    this.dispatch(fromUsersActions.loadEmployeesAction({ companyId: 0 }));
  }

  fetchTeamsList() {
    this.dispatch(fromUsersActions.loadTeamsAction());
  }

  triggerCreateUserAction(model: CreateUserModel) {
    this.dispatch(fromUsersActions.uiStateBusyAction({ isBusy: true }));
    this.dispatch(fromUsersActions.createUserStartAction({ model: model }));
  }

  loadUsers() {
    this.dispatch(fromUsersActions.uiStateBusyAction({ isBusy: true }));
    this.dispatch(fromUsersActions.loadUsersAction());
  }

  dispatch(action: Action) {
    this._store.dispatch(action);
  }
}
