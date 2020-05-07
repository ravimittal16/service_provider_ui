import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { ServiceProxyModule } from "@shared/service-proxies/service-proxy.module";
import { DataPersistence } from "@nrwl/nx";
import { HttpClientModule } from "@angular/common/http";
import { AccountRegisterEffects } from "./register/register.effects";
import { accountReducers } from "./register";

@NgModule({
  imports: [
    ServiceProxyModule,
    StoreModule.forRoot(accountReducers),
    HttpClientModule,
    EffectsModule.forRoot([AccountRegisterEffects]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({ maxAge: 10 }),
  ],
  providers: [DataPersistence],
})
export class CoreDataModule {}
