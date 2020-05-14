import { Injectable } from "@angular/core";
import {
  AccountServiceProxy,
  RegisterModelGenericResponse,
} from "@shared/service-proxies/service-proxies";
import { Actions, Effect } from "@ngrx/effects";
import { DataPersistence } from "@nrwl/nx";
import { map, catchError, tap } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

import {
  AccountRegisterActionTypes,
  AccountRegisterAction,
  AccountRegisterSuccessAction,
  AccountRegisterErrorAction,
  AccountRegisterUiIdleAction,
  AccountRegisterUiBusyAction,
} from "./register.actions";
import { AccountRegisterState } from "./register.reducers";
import { Store } from "@ngrx/store";
import { AppState } from ".";

//Observable<RegisterOutput>
@Injectable({ providedIn: "root" })
export class AccountRegisterEffects {
  @Effect()
  triggerRegister$: Observable<
    RegisterModelGenericResponse
  > = this.dataPersistence.fetch(AccountRegisterActionTypes.AccountRegister, {
    run: (action: AccountRegisterAction, state: AccountRegisterState) => {
      this._store.dispatch(new AccountRegisterUiBusyAction());
      return this.accountServiceProxy.register(action.payload).pipe(
        tap((res) => this._store.dispatch(new AccountRegisterUiIdleAction())),
        map((response) => {
          if (response.isSuccess) {
            // ==========================================================
            // return a success action
            // ==========================================================
            const payload = { model: action.payload, output: response };
            return new AccountRegisterSuccessAction(payload);
          }

          // ==========================================================
          // return a error action
          // ==========================================================
          return new AccountRegisterErrorAction({
            model: action.payload,
            errors: response.errors,
          });
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
    },
    onError: (action) => {
      return new AccountRegisterErrorAction({
        model: action.payload,
        errors: ["Error while connecting to server."],
      });
    },
  });
  constructor(
    private actions$: Actions,
    private _store: Store<AppState>,
    private accountServiceProxy: AccountServiceProxy,
    private dataPersistence: DataPersistence<AccountRegisterState>
  ) {}
}
