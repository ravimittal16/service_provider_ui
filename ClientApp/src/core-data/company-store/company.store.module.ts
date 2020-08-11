import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../../environments/environment";
import { CompanyFacade } from "./company.facade";

import { CompanyStoreEffects } from "./company.effects";
import { companyStoreFeatureKey, reducer } from "./company.reducers";

@NgModule({
  imports: [
    StoreModule.forFeature(companyStoreFeatureKey, reducer),
    EffectsModule.forFeature([CompanyStoreEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [CompanyFacade],
})
export class CompanyStoreModule {}
