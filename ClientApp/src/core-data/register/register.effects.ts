import { Injectable } from "@angular/core";
import {
  AccountServiceProxy,
  RegisterOutput,
} from "@shared/service-proxies/service-proxies";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { DataPersistence } from "@nrwl/nx";
import { map, switchMap, catchError } from "rxjs/operators";
import { of, Observable, throwError } from "rxjs";

import {
  AccountRegisterActionTypes,
  AccountRegisterAction,
  AccountRegisterCompletedAction,
} from "./register.actions";
import { AccountRegisterState } from "./register.reducers";

//Observable<RegisterOutput>
@Injectable({ providedIn: "root" })
export class AccountRegisterEffects {
  @Effect()
  triggerRegister$: Observable<RegisterOutput> = this.dataPersistence.fetch(
    AccountRegisterActionTypes.AccountRegister,
    {
      run: (action: AccountRegisterAction, state: AccountRegisterState) => {
        return this.accountServiceProxy.register(action.payload).pipe(
          map((response) => {
            console.log("EFFECT", response);
            const payload = { model: action.payload, output: response };
            return new AccountRegisterCompletedAction(payload);
          }),
          catchError((error) => {
            console.log("Error", error);
            return throwError(error);
          })
        );
      },
      onError: (error) => {
        console.log("ERROR", error);
      },
    }
  );
  constructor(
    private actions$: Actions,
    private accountServiceProxy: AccountServiceProxy,
    private dataPersistence: DataPersistence<AccountRegisterState>
  ) {}
}
