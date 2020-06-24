import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../../environments/environment";
import { LoginEffects } from "./login.effects";
import { loginReducer } from "./login.reducers";

import { ServiceProxyModule } from "@shared/service-proxies/service-proxy.module";
import { LoginFacade } from "./login.facade";
import { LoginService } from "@shared/services/login.service";

@NgModule({
  imports: [
    ServiceProxyModule,
    StoreModule.forFeature("login", loginReducer),
    EffectsModule.forFeature([LoginEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [LoginService, LoginFacade],
})
export class LoginStoreModule {}
