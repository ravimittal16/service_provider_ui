import { Injectable } from "@angular/core";
import { BaseEffect } from "@core-data/base.effect";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { JobFormsServiceProxy } from "@shared/service-proxies/service-proxies";
import { of } from "rxjs";

import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import * as fromAllActions from "./job.forms.actions";
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
                console.log(error);
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
