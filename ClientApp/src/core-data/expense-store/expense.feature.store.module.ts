import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { NWTokenService } from "@shared/services/token.service";
import { environment } from "../../environments/environment";
import { ExpenseStoreEffects } from "./expense.effects";
import { ExpenseFacade } from "./expense.facade";
import { expenseStoreFeatureKey, reducer } from "./expense.reducers";

@NgModule({
  imports: [
    StoreModule.forFeature(expenseStoreFeatureKey, reducer),
    EffectsModule.forFeature([ExpenseStoreEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [NWTokenService, ExpenseFacade],
})
export class ExpenseStoreModule {}
