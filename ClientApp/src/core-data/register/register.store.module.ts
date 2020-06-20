import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../../environments/environment";
import { AccountRegisterEffects } from "./register.effects";
import * as fromAccountRegister from "./register.reducers";
import { RegsiterFacade } from "./register.facade";

@NgModule({
  imports: [
    StoreModule.forFeature(
      "register",
      fromAccountRegister.accountRegisterReducer
    ),
    EffectsModule.forFeature([AccountRegisterEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [RegsiterFacade],
})
export class RegisterStoreModule {}
