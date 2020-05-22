import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../../environments/environment";
import { CustomerEffects } from "./customers.effects";
import { reducer } from "./customers.reducers";
import { CustomersFacade } from "./customers.facade";
import { ServiceProxyModule } from "@shared/service-proxies/service-proxy.module";

@NgModule({
  imports: [
    ServiceProxyModule,
    StoreModule.forFeature("customers", reducer),
    EffectsModule.forFeature([CustomerEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [CustomersFacade],
})
export class CustomerStoreModule {}
