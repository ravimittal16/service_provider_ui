import * as fromUserActions from "./users.actions";
import {
  mergeMap,
  catchError,
  switchMap,
  withLatestFrom,
  filter,
  concatMap,
  map,
} from "rxjs/operators";
import { ofType, createEffect, Actions } from "@ngrx/effects";
import { UsersServiceProxy } from "@shared/service-proxies/service-proxies";
import { BaseEffect } from "@core-data/base.effect";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Store } from "@ngrx/store";
import { UsersState } from "./users.state";
import * as fromUsersSelectors from "./users.selectors";

@Injectable()
export class UsersEffects extends BaseEffect {
  constructor(
    private _store: Store<UsersState>,
    private usersDataService: UsersServiceProxy,
    private actions$: Actions
  ) {
    super();
  }

  onFetchUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromUserActions.loadUsersAction),
      withLatestFrom(this._store.select(fromUsersSelectors.selectAllUsers)),
      filter(([action, users]) => {
        return users !== null;
      }),
      concatMap(() =>
        this.usersDataService.getAllUsers().pipe(
          map((response) => {
            return fromUserActions.usersLoadedAction({ users: response });
          }),
          catchError((error) => {
            return of(
              fromUserActions.userErrorsStateAction({
                errors: ["Error while loading users."],
              })
            );
          })
        )
      )
    );
  });

  fetchEmployees$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromUserActions.loadEmployeesAction),
      withLatestFrom(
        this._store.select(fromUsersSelectors.selectEmployeesList)
      ),
      filter(([action, employees]) => {
        return employees === undefined || employees.length === 0;
      }),
      mergeMap(() =>
        this.usersDataService.getAllEmployees().pipe(
          map((data) =>
            fromUserActions.loaedEmployeesList({ employees: data })
          ),
          catchError((error) => {
            return of(
              fromUserActions.userErrorsStateAction({
                errors: ["Error while loading employees."],
              })
            );
          })
        )
      )
    );
  });

  fetchTeams$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromUserActions.loadTeamsAction),
      withLatestFrom(this._store.select(fromUsersSelectors.selectTeamsList)),
      filter(([action, teams]) => {
        return teams === undefined || teams.length === 0;
      }),
      mergeMap(() =>
        this.usersDataService.getAllTeams().pipe(
          map((data) => {
            console.log(data);
            return fromUserActions.loadedTeamsList({ teams: data });
          }),
          catchError((error) => {
            return of(
              fromUserActions.userErrorsStateAction({
                errors: ["Error while loading teams."],
              })
            );
          })
        )
      )
    );
  });

  createUpdateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromUserActions.createUserStartAction),
      mergeMap((action) =>
        this.usersDataService.createUser(action.model).pipe(
          switchMap((response) => {
            return [
              fromUserActions.uiStateBusyAction({ isBusy: false }),
              fromUserActions.createUserStartCompleted({
                errors: response.errors,
                isSuccess: response.isSuccess,
              }),
            ];
          }),
          catchError((error) => {
            return this.parseErrorWithAction(error).pipe(
              switchMap((error) => {
                return of(
                  fromUserActions.userErrorsStateAction({
                    errors: [error],
                  })
                );
              })
            );
          })
        )
      )
    );
  });
}
