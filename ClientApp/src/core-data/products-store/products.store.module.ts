import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../../environments/environment";
import { productsStoreFeatureKey, reducer } from "./products.reducers";
import { ProductsStoreEffects } from "./products.effects";
import { ProductssFacade as ProductsFacade } from "./products.facade";
import { NWTokenService } from "@shared/services/token.service";

@NgModule({
  imports: [
    StoreModule.forFeature(productsStoreFeatureKey, reducer),
    EffectsModule.forFeature([ProductsStoreEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [NWTokenService, ProductsFacade],
})
export class ProductsStoreModule {}
