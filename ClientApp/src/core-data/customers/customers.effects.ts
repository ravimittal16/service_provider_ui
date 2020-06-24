import { Injectable } from "@angular/core";
import * as customerActions from "./customers.actions";
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

  importCustomers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerActions.importCustomerAction),
      /** An EMPTY observable only emits completion. Replace with your own observable stream */
      mergeMap((action) =>
        this.customerService.importCustomers().pipe(
          map((response) => {
            if (response.length > 0 && response[0].isSuccess)
              return customerActions.loadCustomersAction({ companyId: 0 });
          })
        )
      )
    );
  });

  customers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerActions.loadCustomersAction),
      mergeMap((action) =>
        this.customerService.getAllCustomers().pipe(
          map((data) => {
            return customerActions.customersLoadedAction({ customers: data });
          }),
          catchError((error) => {
            return of(
              customerActions.createCustomerErrorAction({
                errors: ["Error while loading customers.", error],
              })
            );
          })
        )
      )
    );
  });
}
