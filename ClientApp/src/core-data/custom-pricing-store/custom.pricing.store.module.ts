import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { NWTokenService } from "@shared/services/token.service";
import { environment } from "../../environments/environment";
import { CustomPricingEffects } from "./custom.pricing.effects";
import { CustomPricingFacade } from "./custom.pricing.facade";
import {
  customPricingStoreFeatureKey,
  reducer,
} from "./custom.pricing.reducer";

@NgModule({
  imports: [
    StoreModule.forFeature(customPricingStoreFeatureKey, reducer),
    EffectsModule.forFeature([CustomPricingEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [NWTokenService, CustomPricingFacade],
})
export class CustomPricingStoreModule {}
