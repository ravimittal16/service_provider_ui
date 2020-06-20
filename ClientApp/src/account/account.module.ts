import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { ServiceProxyModule } from "@shared/service-proxies/service-proxy.module";
import { AccountComponent } from "./account.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

import { AccountRoutingModule } from "./account-routing.module";
import { AbpModule } from "@abp/abp.module";
import { SharedModule } from "@shared/shared.module";
import { CoreDataModule } from "src/core-data/core.data.module";

const _components = [AccountComponent, LoginComponent, RegisterComponent];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AbpModule,
    SharedModule.forRoot(),
    ServiceProxyModule,
    AccountRoutingModule,
    CoreDataModule,
  ],
  declarations: [..._components],
})
export class AccountModule {
  constructor() {}
}
