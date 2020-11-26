import { Injectable } from "@angular/core";
import { BaseEffect } from "@core-data/base.effect";
import { ProductsFacade } from "@core-data/products-store/products.facade";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import {
  JobsServiceProxy,
  OperationResult,
} from "@shared/service-proxies/service-proxies";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
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

  deleteItem$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(jobsActions.deleteItemFromJob),
        mergeMap((action) =>
          this.jobsServiceProxy
            .deleteLineItem(action.jobId, action.itemId)
            .pipe(
              switchMap((data: OperationResult) => {
                return [
                  jobsActions.deleteItemFromJobCompleted({
                    itemId: action.itemId,
                    success: data.isSuccess,
                  }),
                  jobsActions.eventCompleteListenerAction({
                    payload: {
                      actionType: "Delete Item",
                      itemId: action.itemId,
                      jobId: action.jobId,
                      success: data.isSuccess,
                    },
                  }),
                ];
              }),
              catchError((error) =>
                of(
                  jobsActions.jobsLoadedErrorAction({
                    errors: ["Error while deleting item.", error],
                  })
                )
              )
            )
        )
      );
    },
    { dispatch: true }
  );

  deleteVisit$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(jobsActions.deleteVisitAction),
        mergeMap((action) =>
          this.jobsServiceProxy
            .deleteVisit(action.jobId, action.visitId, action.deleteVisitItems)
            .pipe(
              switchMap((data: OperationResult) => {
                return [
                  jobsActions.deleteVisitCompletedAction({
                    visitId: action.visitId,
                    jobId: action.jobId,
                    deleteVisitItems: action.deleteVisitItems,
                    success: data.isSuccess,
                  }),
                  jobsActions.eventCompleteListenerAction({
                    payload: {
                      actionType: "Delete Visit",
                      visitId: action.visitId,
                      jobId: action.jobId,
                      success: data.isSuccess,
                    },
                  }),
                ];
              }),
              catchError((error) =>
                of(
                  jobsActions.jobsLoadedErrorAction({
                    errors: ["Error while deleting item.", error],
                  })
                )
              )
            )
        )
      );
    },
    { dispatch: true }
  );

  markVisitAsCompleted$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(jobsActions.markVisitAsCompletedAction),
        mergeMap((action) =>
          this.jobsServiceProxy
            .markVisitAsCompleted(action.jobId, action.visitId)
            .pipe(
              switchMap((data) => {
                if (data.isSuccess) {
                  return [
                    jobsActions.onMarkVisitAsCompletedActionCompleted({
                      visit: data.entity,
                    }),
                    jobsActions.eventCompleteListenerAction({
                      payload: {
                        actionType: "Marked as completed",
                        visitId: action.visitId,
                        jobId: action.jobId,
                        success: data.isSuccess,
                      },
                    }),
                  ];
                }
              }),
              catchError((error) =>
                of(
                  jobsActions.jobsLoadedErrorAction({
                    errors: ["Error while updating visit.", error],
                  })
                )
              )
            )
        )
      );
    },
    { dispatch: true }
  );

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
