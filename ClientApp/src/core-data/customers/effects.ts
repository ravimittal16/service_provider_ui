import { Injectable } from "@angular/core";
import * as customerActions from "./actions";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import {
  CustomersServiceProxy,
  CustomerDto,
} from "@shared/service-proxies/service-proxies";
import { Observable, of } from "rxjs";
import { mergeMap, map, catchError } from "rxjs/operators";
import { Action } from "@ngrx/store";
@Injectable()
export class CustomerEffects {
  constructor(
    private customerService: CustomersServiceProxy,
    private actions$: Actions
  ) {}

  customers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerActions.loadCustomersAction),
      mergeMap((action) =>
        this.customerService.getAllCustomers(action.companyId).pipe(
          map((data) =>
            customerActions.customersLoadedAction({ customers: data })
          ),
          catchError((error) =>
            of(
              customerActions.createCustomerErrorAction({
                errors: ["Error while loading customers."],
              })
            )
          )
        )
      )
    );
  });
}
