import { Injectable } from "@angular/core";
import { BaseEffect } from "@core-data/base.effect";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { JobFormsServiceProxy } from "@shared/service-proxies/service-proxies";
import { Observable, of } from "rxjs";

import {
  catchError,
  concatMap,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
} from "rxjs/operators";
import * as fromAllActions from "./job.forms.actions";
import * as fromAllSelectors from "./job.forms.selectors";
import { JobFormsState } from "./job.forms.state";

@Injectable()
export class JobFormsEffects extends BaseEffect {
  constructor(
    private _store: Store<JobFormsState>,
    private jobFormsService: JobFormsServiceProxy,
    private actions$: Actions
  ) {
    super();
  }

  loadAllFormsDefinations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAllActions.loadAllJobFormDefinationAction),
      mergeMap((action) =>
        this.jobFormsService.getAllFormDefinations().pipe(
          map((res) =>
            fromAllActions.allJobFormDefinationsLoadedAction({
              definations: res,
            })
          )
        )
      )
    );
  });

  deleteJobFormDefination$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAllActions.deleteJobFormDefinationAction),
      mergeMap((action) =>
        this.jobFormsService.deleteJobFormDefination(action.jobFormId).pipe(
          map((res) => {
            return fromAllActions.onDeleteJobFormDefinationCompletedAction({
              jobFormId: action.jobFormId,
              isSuccess: res,
            });
          })
        )
      )
    );
  });

  fetchFormDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAllActions.fetchFormDetailsAction),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this._store.select(fromAllSelectors.selectRouteFormId))
        )
      ),
      mergeMap(([action, formId]) => {
        return !formId
          ? of(fromAllActions.clearFormDetailsAction())
          : this.jobFormsService.getFormDetails(+formId).pipe(
              map((data) =>
                fromAllActions.formDetailsFetchedAction({
                  details: data.entity,
                  isSuccess: data.isSuccess,
                })
              ),
              catchError((error) =>
                of(
                  fromAllActions.updateErrorStateAction({
                    errors: [error],
                  })
                )
              )
            );
      })
    );
  });

  createJobForm$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAllActions.createJobFormAction),
      mergeMap((action) =>
        this.jobFormsService.createJobForm(action.model).pipe(
          map((data) =>
            fromAllActions.createJobFormCompletedAction({
              response: data,
              isSuccess: data.isSuccess,
            })
          ),
          catchError((error) => {
            return this.parseErrorWithAction(error).pipe(
              switchMap((error) => {
                return of(
                  fromAllActions.updateErrorStateAction({
                    errors: [error],
                  })
                );
              })
            );
          })
        )
      )
    );
  });
}
