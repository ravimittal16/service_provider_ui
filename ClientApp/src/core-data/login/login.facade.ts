import { Injectable } from "@angular/core";

import { Facade } from "@core-data/iFacade";
import { Action, Store } from "@ngrx/store";
import { AuthenticateModel } from "@shared/service-proxies/service-proxies";
import { LoginState } from "./login.state";
import * as loginActions from "./login.actions";
@Injectable({
  providedIn: "root",
})
export class LoginFacade implements Facade {
  constructor(private _store: Store<LoginState>) {}

  tryLogin(model: AuthenticateModel) {
    this.dispatch(loginActions.loginRunningAction({ payload: true }));
    this.dispatch(loginActions.loginTrigger({ payload: model }));
  }

  dispatch(action: Action) {
    this._store.dispatch(action);
  }
}
