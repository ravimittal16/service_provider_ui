import { Injectable } from "@angular/core";

import { Facade } from "@core-data/iFacade";
import { Action, Store, select } from "@ngrx/store";
import { AuthenticateModel } from "@shared/service-proxies/service-proxies";
import { LoginState } from "./login.state";
import * as loginActions from "./login.actions";
import * as loginSelectors from "./login.selectors";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class LoginFacade implements Facade {
  isBusy$: Observable<boolean>;
  isAuthenticated$: Observable<boolean>;
  constructor(private _store: Store<LoginState>) {
    this.isBusy$ = this._store.pipe(select(loginSelectors.isBusy));
    this.isAuthenticated$ = this._store.pipe(
      select(loginSelectors.isAuthenticated)
    );

    this.isAuthenticated$
      .pipe(
        map((isAuthenticated) => {
          if (isAuthenticated) {
            this.dispatch(
              loginActions.handleRedirectSuccess({
                redirectUrl: "app/main/dashboard",
              })
            );
          }
        })
      )
      .subscribe();
  }

  authenticateUser(model: AuthenticateModel) {
    this.dispatch(loginActions.loginRunningAction({ payload: true }));
    this.dispatch(loginActions.loginTrigger({ payload: model }));
  }

  dispatch(action: Action) {
    this._store.dispatch(action);
  }
}
