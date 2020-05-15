import { Injectable } from "@angular/core";
import { Store, select, Action } from "@ngrx/store";
import { AppState, registrationErrors, registrationUiState } from "./";
import { Observable } from "rxjs";
import { RegisterModel } from "@shared/service-proxies/service-proxies";
import { AccountRegisterAction } from "./register.actions";
import { Facade } from "@core-data/iFacade";

@Injectable({
  providedIn: "root",
})
export class RegsiterFacade implements Facade {
  errors$: Observable<string[]>;
  uiState$: Observable<boolean>;

  constructor(private _store: Store<AppState>) {
    this.errors$ = this._store.pipe(select(registrationErrors));
    this.uiState$ = this._store.pipe(select(registrationUiState));
  }

  dispatch(action: Action) {
    this._store.dispatch(action);
  }

  processRegister(payload: RegisterModel) {
    this.dispatch(new AccountRegisterAction(payload));
  }
}
