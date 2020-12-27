import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { NWTokenService } from "@shared/services/token.service";
import { environment } from "../../environments/environment";
import { CustomFieldsStoreEffects } from "./custom.fields.effects";
import { CustomFieldsFacade } from "./custom.fields.facade";
import { customFieldsStoreFeatureKey, reducer } from "./custom.fields.reducer";

@NgModule({
  imports: [
    StoreModule.forFeature(customFieldsStoreFeatureKey, reducer),
    EffectsModule.forFeature([CustomFieldsStoreEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [NWTokenService, CustomFieldsFacade],
})
export class CustomFieldsStoreModule {}
