import { Injectable } from "@angular/core";
import { LoginService } from "@shared/services/login.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as loginActions from "./login.actions";
import { mergeMap, tap, map } from "rxjs/operators";
import { LoginState } from "./login.state";
import { Store } from "@ngrx/store";

@Injectable({ providedIn: "root" })
export class LoginEffects {
  constructor(
    private loginService: LoginService,
    private actions$: Actions,
    private _store: Store<LoginState>
  ) {}

  //trigger login
  triggerLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginActions.loginTrigger),
      mergeMap((action) => {
        this.loginService.authenticateModel = action.payload;
        return this.loginService.loginUser(action.payload).pipe(
          tap((res) => {
            this._store.dispatch(loginActions.loginCompletedAction());
          }),
          map((response) => {
            if (response.accessToken)
              return loginActions.loginSuccess({ payload: response });
            return loginActions.loginFailure({ payload: response });
          })
        );
      })
    );
  });
}
