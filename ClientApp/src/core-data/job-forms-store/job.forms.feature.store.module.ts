import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { NWTokenService } from "@shared/services/token.service";
import { environment } from "../../environments/environment";
import { JobFormsEffects } from "./job.forms.effects";
import { JobFormsFacade } from "./job.forms.facade";
import { jobFormsFeatureKey, reducer } from "./job.forms.reducers";

@NgModule({
  imports: [
    StoreModule.forFeature(jobFormsFeatureKey, reducer),
    EffectsModule.forFeature([JobFormsEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [NWTokenService, JobFormsFacade],
})
export class JobFormsStoreModule {}
