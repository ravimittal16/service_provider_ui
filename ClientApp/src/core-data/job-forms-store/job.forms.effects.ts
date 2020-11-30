import { Injectable } from "@angular/core";
import { BaseEffect } from "@core-data/base.effect";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { CompanyServiceProxy } from "@shared/service-proxies/service-proxies";

import { map, mergeMap } from "rxjs/operators";
import * as fromAllActions from "./job.forms.actions";
import { JobFormsState } from "./job.forms.state";

@Injectable()
export class JobFormsEffects extends BaseEffect {
  constructor(
    private _store: Store<JobFormsState>,
    private companyService: CompanyServiceProxy,
    private actions$: Actions
  ) {
    super();
  }

  loadAllFormsDefinations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAllActions.loadAllJobFormDefinationAction),
      mergeMap((action) =>
        this.companyService.getAllFormDefinations().pipe(
          map((res) =>
            fromAllActions.allJobFormDefinationsLoadedAction({
              definations: res,
            })
          )
        )
      )
    );
  });
}
