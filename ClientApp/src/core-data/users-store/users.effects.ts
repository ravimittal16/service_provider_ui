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

  // onFetchUsers$ = createEffect(() => {
  //   return this.actions$.pipe(
  //       ofType(fromUserActions.loadUsersAction),
  //       withLatestFrom(this._store.select(fromUsersSelectors.selectAllUsers)),
  //       filter()
  //       operator(() =>
  //         apiSource.pipe(
  //           map(data => fromUserActions.loadUsersAction({ data })),
  //           withLatestFrom(this.)
  //           catchError(error => of(fromUserActions.loadUsersAction({ error }))))
  //           withLatestFrom(this.)
  //         ),
  //   );
  // });

  onFetchUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromUserActions.loadUsersAction),
      withLatestFrom(this._store.select(fromUsersSelectors.selectAllUsers)),
      filter(([action, users]) => users === null),
      concatMap(() =>
        this.usersDataService.getAllUsers().pipe(
          map((response) =>
            fromUserActions.usersLoadedAction({ users: response })
          ),
          catchError((error) => {
            return of(
              fromUserActions.userErrorsStateAction({
                errors: ["Error while loading users.", error],
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
