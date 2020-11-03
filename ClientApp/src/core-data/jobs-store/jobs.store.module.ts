import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../../environments/environment";
import { JobsEffects } from "./jobs.effects";
import { jobsFeatureKey, reducer } from "./jobs.reducers";

@NgModule({
  imports: [
    StoreModule.forFeature(jobsFeatureKey, reducer),
    EffectsModule.forFeature([JobsEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [],
})
export class JobsStoreModule {}
