import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import * as ApiServiceProxies from "./service-proxies";
import { HttpReqInterceptor } from "@shared/infrastructure/request.interceptor";

@NgModule({
  providers: [
    ApiServiceProxies.AccountServiceProxy,
    ApiServiceProxies.WeatherForecastServiceProxy,
    ApiServiceProxies.CustomersServiceProxy,
    ApiServiceProxies.ProductsServiceProxy,
    ApiServiceProxies.UsersServiceProxy,
    ApiServiceProxies.CompanyServiceProxy,
    ApiServiceProxies.JobsServiceProxy,
    { provide: HTTP_INTERCEPTORS, useClass: HttpReqInterceptor, multi: true },
  ],
})
export class ServiceProxyModule {}
