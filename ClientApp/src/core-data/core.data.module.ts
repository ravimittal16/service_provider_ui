import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { ActionReducerMap, StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { ServiceProxyModule } from "@shared/service-proxies/service-proxy.module";
import { DataPersistence } from "@nrwl/nx";
import { HttpClientModule } from "@angular/common/http";

import { CustomerStoreModule } from "./customers/customers-store.module";
import { LoginStoreModule } from "./login/login-store.module";

import { RegisterStoreModule } from "./register/register.store.module";
import { ProductsStoreModule } from "./products-store/products.store.module";
import { UsersStoreModule } from "./users-store/users.store.module";
import { CompanyStoreModule } from "./company-store/company.store.module";
import { JobsStoreModule } from "./jobs-store/jobs.store.module";

import { JobFormsStoreModule } from "./job-forms-store/job.forms.feature.store.module";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { CustomStateSerializer } from "./router.reducer";
import { RouterModule } from "@angular/router";
import * as routerStateSelector from "./router.reducer";
import { RouterReducerState, routerReducer } from "@ngrx/router-store";
import { ExpenseStoreModule } from "./expense-store/expense.feature.store.module";

export interface RootState {
  routerReducer: routerStateSelector.MergedRouteReducerState;
}

export const rootReducers: ActionReducerMap<RootState> = {
  routerReducer: routerReducer,
};
@NgModule({
  imports: [
    ServiceProxyModule,
    CustomerStoreModule,
    LoginStoreModule,
    RegisterStoreModule,
    ProductsStoreModule,
    UsersStoreModule,
    CompanyStoreModule,
    JobsStoreModule,
    HttpClientModule,
    JobFormsStoreModule,
    ExpenseStoreModule,
    RouterModule,
    StoreRouterConnectingModule.forRoot({
      stateKey: "routerReducer",
      serializer: CustomStateSerializer,
    }),
    StoreModule.forRoot(rootReducers, { metaReducers: [] }),
    EffectsModule.forRoot([]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  providers: [DataPersistence],
})
export class CoreDataModule {}
