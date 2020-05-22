import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../../environments/environment";
import { CustomerEffects } from "./customers.effects";
import { reducer } from "./customers.reducers";

@NgModule({
  imports: [
    StoreModule.forFeature("customers", reducer),
    EffectsModule.forFeature([CustomerEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
})
export class CustomerStoreModule {}
