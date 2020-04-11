import * as _ from "lodash";
import { AppConsts } from "@shared/AppConsts";
import { NgModule, APP_INITIALIZER, Injector, LOCALE_ID } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ServiceProxyModule } from "@shared/service-proxies/service-proxy.module";
import { RootRoutingModule } from "./root-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG,
} from "@angular/platform-browser";
import { RootComponent } from "./root.component";
import { API_BASE_URL } from "@shared/service-proxies/service-proxies";
import { PlatformLocation } from "@angular/common";
import { GestureConfig } from "@angular/material/core";
import { HttpReqInterceptor } from "@shared/infrastructure/request.interceptor";

export function convertAbpLocaleToAngularLocale(locale: string): string {
  if (!AppConsts.localeMappings) {
    return locale;
  }

  const localeMapings = _.filter(AppConsts.localeMappings, { from: locale });
  if (localeMapings && localeMapings.length) {
    return localeMapings[0]["to"];
  }

  return locale;
}

export function getRemoteServiceBaseUrl(): string {
  return AppConsts.remoteServiceBaseUrl;
}

function getDocumentOrigin() {
  if (!document.location.origin) {
    const port = document.location.port ? ":" + document.location.port : "";
    return (
      document.location.protocol + "//" + document.location.hostname + port
    );
  }

  return document.location.origin;
}

function getCurrentLanguage(): string {
  return "en";
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceProxyModule,
    RootRoutingModule,
    HttpClientModule,
  ],
  declarations: [RootComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpReqInterceptor, multi: true },
    { provide: API_BASE_URL, useFactory: getRemoteServiceBaseUrl },
    {
      provide: APP_INITIALIZER,
      useFactory: null,
      deps: [Injector, PlatformLocation],
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useFactory: getCurrentLanguage,
    },
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
  ],
  bootstrap: [RootComponent],
})
export class RootModule {}
