import { Facade } from "@core-data/iFacade";
import { Injectable } from "@angular/core";
import { Action, Store, select } from "@ngrx/store";
import {
  UserDto,
  CreateUserModel,
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

  constructor(private _store: Store<UsersState>) {
    this.users$ = this._store.pipe(select(fromUsersSelectors.selectAllUsers));
    this.isBusy$ = this._store.pipe(
      select(fromUsersSelectors.usersBusyStateSelector)
    );
    this.errors$ = this._store.pipe(select(fromUsersSelectors.selectErrors));
  }

  onUserModalOpened() {
    this.dispatch(fromUsersActions.modalOpenedAction());
  }

  createUser(model: CreateUserModel) {
    this.dispatch(fromUsersActions.uiStateBusyAction({ isBusy: true }));
    this.dispatch(fromUsersActions.createUserStartAction({ model: model }));
  }

  dispatch(action: Action) {
    this._store.dispatch(action);
  }
}
