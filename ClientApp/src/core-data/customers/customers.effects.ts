import { Injectable } from "@angular/core";
import * as customerActions from "./customers.actions";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import {
  CustomersServiceProxy,
  CustomerDto,
} from "@shared/service-proxies/service-proxies";
import { Observable, of } from "rxjs";
import { mergeMap, map, catchError } from "rxjs/operators";
import { take } from "lodash";

@Injectable()
export class CustomerEffects {
  constructor(
    private customerService: CustomersServiceProxy,
    private actions$: Actions
  ) {}

  importCustomers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerActions.importCustomerAction),
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

  loadCustomerDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerActions.loadEditedCustomerDetails),
      mergeMap((action) =>
        this.customerService
          .getCustomerEditDetails(action.customerId)
          .pipe(
            map((res) =>
              customerActions.editedCustomerDetailsLoaded({ details: res })
            )
          )
      )
    );
  });

  saveCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerActions.processCreateEditCustomerAction),
      /** An EMPTY observable only emits completion. Replace with your own observable stream */
      mergeMap((action) =>
        this.customerService.createUpdateCustomer(action.customerModel).pipe(
          map((res) => {
            if (res.isSuccess) {
              return customerActions.createCustomerSuccessAction({
                customerModelResponse: res,
              });
            } else {
              return customerActions.createCustomerErrorAction({
                errors: res.errors,
              });
            }
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
