import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../../environments/environment";
import { usersFeatureKey, reducer } from "./users.redurcers";
import { UsersEffects } from "./users.effects";
import { UsersFacade } from "./users.facade";

@NgModule({
  imports: [
    StoreModule.forFeature(usersFeatureKey, reducer),
    EffectsModule.forFeature([UsersEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [UsersFacade],
})
export class UsersStoreModule {}
