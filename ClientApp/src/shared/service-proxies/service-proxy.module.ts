import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AbpHttpInterceptor } from "@abp/abpHttpInterceptor";

import * as ApiServiceProxies from "./service-proxies";
import { HttpReqInterceptor } from "@shared/infrastructure/request.interceptor";

@NgModule({
  providers: [
    ApiServiceProxies.AccountServiceProxy,
    ApiServiceProxies.WeatherForecastServiceProxy,
    { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true },
  ],
})
export class ServiceProxyModule {}
