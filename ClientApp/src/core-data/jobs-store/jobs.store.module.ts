import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { NWTokenService } from "@shared/services/token.service";
import { environment } from "../../environments/environment";
import { JobsEffects } from "./jobs.effects";
import { JobsFacade } from "./jobs.facade";
import { jobsFeatureKey, reducer } from "./jobs.reducers";
import { JobsVisitsEffects } from "./jobs.visit.effects";

@NgModule({
  imports: [
    StoreModule.forFeature(jobsFeatureKey, reducer),
    EffectsModule.forFeature([JobsEffects, JobsVisitsEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [NWTokenService, JobsFacade],
})
export class JobsStoreModule {}
