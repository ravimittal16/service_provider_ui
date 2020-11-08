import { Injectable } from "@angular/core";
import { BaseEffect } from "@core-data/base.effect";
import { ProductsFacade } from "@core-data/products-store/products.facade";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { JobsServiceProxy } from "@shared/service-proxies/service-proxies";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import * as jobsActions from "./jobs.actions";
import { JobsState } from "./jobs.state";

@Injectable()
export class JobsEffects extends BaseEffect {
  constructor(
    private _store: Store<JobsState>,
    private jobsServiceProxy: JobsServiceProxy,
    private actions$: Actions,
    private _facade: ProductsFacade
  ) {
    super();
  }

  fetchJobDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(jobsActions.fetchJobDetailsAction),
      mergeMap((action) =>
        this.jobsServiceProxy.getJobDetails(action.jobId).pipe(
          map((data) =>
            jobsActions.fetchJobDetailsCompletedAction({
              jobId: action.jobId,
              details: data,
            })
          ),
          catchError((error) => {
            return of(
              jobsActions.jobsLoadedErrorAction({
                errors: ["Error while loading job details.", error],
              })
            );
          })
        )
      )
    );
  });

  loadJobs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(jobsActions.loadJobsAction),
      mergeMap(() =>
        this.jobsServiceProxy.getJobs(null).pipe(
          map(
            (data) => jobsActions.jobsLoadedAction({ items: data }),
            catchError((error) => {
              return of(
                jobsActions.jobsLoadedErrorAction({
                  errors: ["Error while loading jobs.", error],
                })
              );
            })
          )
        )
      )
    );
  });
}
