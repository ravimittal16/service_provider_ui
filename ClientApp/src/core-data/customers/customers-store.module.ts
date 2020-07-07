import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../../environments/environment";
import { CustomerEffects } from "./customers.effects";
import { reducer, customerFeatureKey } from "./customers.reducers";
import { CustomersFacade } from "./customers.facade";
import { ServiceProxyModule } from "@shared/service-proxies/service-proxy.module";
import { NWTokenService } from "@shared/services/token.service";

@NgModule({
  imports: [
    ServiceProxyModule,
    StoreModule.forFeature(customerFeatureKey, reducer),
    EffectsModule.forFeature([CustomerEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [NWTokenService, CustomersFacade],
})
export class CustomerStoreModule {}
