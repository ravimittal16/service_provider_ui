import { Injectable } from "@angular/core";
import { Store, select, Action } from "@ngrx/store";

import { Observable } from "rxjs";
import { RegisterModel } from "@shared/service-proxies/service-proxies";
import {
  AccountRegisterAction,
  LoadExternalSignupInfoAction,
} from "./register.actions";
import { Facade } from "@core-data/iFacade";
import { AccountRegisterState } from "./register.reducers";
import {
  registrationErrors,
  registrationUiState,
  selectExternalSignModel,
} from "./register.selectors";

@Injectable({
  providedIn: "root",
})
export class RegsiterFacade implements Facade {
  errors$: Observable<string[]>;
  uiState$: Observable<boolean>;
  externalModel$: Observable<RegisterModel>;
  constructor(private _store: Store<AccountRegisterState>) {
    this.errors$ = this._store.pipe(select(registrationErrors));
    this.uiState$ = this._store.pipe(select(registrationUiState));
    this.externalModel$ = this._store.pipe(select(selectExternalSignModel));
  }

  dispatch(action: Action) {
    this._store.dispatch(action);
  }

  processRegister(payload: RegisterModel) {
    this.dispatch(new AccountRegisterAction(payload));
  }

  fetchExternalSignupModel(signupKey: string) {
    const payload = { signupKey: signupKey };
    this.dispatch(new LoadExternalSignupInfoAction(payload));
  }
}
