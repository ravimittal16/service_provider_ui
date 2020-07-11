import * as fromUserActions from "./users.actions";
import { mergeMap, map, catchError, switchMap } from "rxjs/operators";
import { ofType, createEffect, Actions } from "@ngrx/effects";
import { UsersServiceProxy } from "@shared/service-proxies/service-proxies";
import { BaseEffect } from "@core-data/base.effect";
import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable()
export class UsersEffects extends BaseEffect {
  constructor(
    private usersDataService: UsersServiceProxy,
    private actions$: Actions
  ) {
    super();
  }
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
            return of(
              fromUserActions.userErrorsStateAction({
                errors: ["Error while loading customers.", error],
              })
            );
          })
        )
      )
    );
  });
}
