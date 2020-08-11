import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../../environments/environment";
import { CompanyFacade } from "./company.facade";
import {
  reducer,
  customerFeatureKey,
} from "@core-data/customers/customers.reducers";
import { CompanyStoreEffects } from "./company.effects";

@NgModule({
  imports: [
    StoreModule.forFeature(customerFeatureKey, reducer),
    EffectsModule.forFeature([CompanyStoreEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [CompanyFacade],
})
export class CompanyStoreModule {}
