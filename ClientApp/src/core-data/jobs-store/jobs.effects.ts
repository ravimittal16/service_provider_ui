import { Injectable } from "@angular/core";
import { BaseEffect } from "@core-data/base.effect";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { JobsServiceProxy } from "@shared/service-proxies/service-proxies";
import * as jobsActions from "./jobs.actions";
import { JobsState } from "./jobs.state";

@Injectable()
export class JobsEffects extends BaseEffect {
  constructor(
    private _store: Store<JobsState>,
    private jobsServiceProxy: JobsServiceProxy,
    private actions$: Actions
  ) {
    super();
  }
  //   loadJobs$ = createEffect(() => {
  //     return this.actions$.pipe(
  //       ofType(jobsActions.loadJobsAction),
  //       operator(() =>
  //         this.jobsServiceProxy..pipe(
  //           map((data) => FeatureActions.actionSuccess({ data })),
  //           catchError((error) => of(FeatureActions.actionFailure({ error })))
  //         )
  //       )
  //     );
  //   });
}
