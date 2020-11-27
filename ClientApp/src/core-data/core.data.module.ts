import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
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
import { reducers } from "./core.data.reducers";

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
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  providers: [DataPersistence],
})
export class CoreDataModule {}
