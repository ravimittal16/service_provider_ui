import { Injectable } from "@angular/core";
import { BaseEffect } from "@core-data/base.effect";
import { reducers } from "@core-data/core.data.reducers";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { JobFormsServiceProxy } from "@shared/service-proxies/service-proxies";
import { Observable, of } from "rxjs";

import {
  catchError,
  concatMap,
  filter,
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
      withLatestFrom(this._store.select(fromAllSelectors.selectAllDefinations)),
      filter(([action, commonData]) => {
        return Object.keys(commonData).length === 0;
      }),
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

  fetchJobFormDetailsAction$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAllActions.fetchJobFormDataDetailsAction),
      mergeMap((action) =>
        this.jobFormsService
          .getJobFormData(action.jobId, action.formId, action.recordId)
          .pipe(
            map((res) => {
              return fromAllActions.fetchJobFormDataDetailsCompletedAction({
                details: res?.entity,
              });
            })
          )
      )
    );
  });

  attachJobFormToJobAction$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAllActions.attachJobFormToJobAction),
      mergeMap((action) =>
        this.jobFormsService
          .attachJobFormToJob(action.formId, action.jobId)
          .pipe(
            map((res) => {
              return fromAllActions.attachJobFormToJobCompletedAction({
                errors: res.clientMessages,
                isSuccess: res.isSuccess,
                returnCode: res.returnCode,
              });
            })
          )
      )
    );
  });

  deleteJobFormSection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAllActions.deleteJobFormSectionAction),
      mergeMap((action) =>
        this.jobFormsService.deleteJobFormSection(action.sectionId).pipe(
          map((res) => {
            if (res) {
              return fromAllActions.fetchFormDetailsAction({ formId: 0 });
            }
            return fromAllActions.updateErrorStateAction({
              errors: ["Error while deleting the section."],
            });
          })
        )
      )
    );
  });

  fetchFormDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAllActions.fetchFormDetailsAction),
      concatMap((action) => {
        return of(action).pipe(
          withLatestFrom(this._store.select(fromAllSelectors.selectRouteFormId))
        );
      }),
      mergeMap(([action, formId]) => {
        return !formId
          ? of(fromAllActions.clearFormDetailsAction())
          : this.jobFormsService.getFormDetails(+formId).pipe(
              map((data) => {
                return fromAllActions.formDetailsFetchedAction({
                  details: data.entity,
                  isSuccess: data.isSuccess,
                  formId: formId,
                });
              }),
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
          switchMap((data) => [
            fromAllActions.createJobFormCompletedAction({
              response: data,
              isSuccess: data.isSuccess,
            }),
            fromAllActions.eventCompleteListenerAction({
              payload: {
                actionType:
                  action.model.formId === 0
                    ? "Add Job Form"
                    : "Update Job Form",
                success: data.isSuccess,
              },
            }),
          ]),
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
