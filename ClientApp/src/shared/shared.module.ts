import { ModuleWithProviders, NgModule, ErrorHandler } from "@angular/core";
import { LocalizePipe } from "@shared/pipes/localize.pipe";
import { NWTokenService } from "@shared/services/token.service";
import { AppLogoComponent } from "@shared/logo/logo.component";
import { environment } from "../environments/environment";
import { BlockDirective } from "./directives/block.directive";
import { BusyDirective } from "./directives/busy.directive";

import { CommonModule } from "@angular/common";
import { API_BASE_URL } from "./service-proxies/service-proxies";
import { LoginService } from "./services/login.service";

import { GlobalErrorHandler } from "./infrastructure/GlobalErrorHandler";
import { AppErrorViewComponent } from "./components/error-view/error.view.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CurrencySymbolPipe } from "./pipes/currency.symbol.pipe";

const directives = [BlockDirective, BusyDirective];
const components = [AppLogoComponent, AppErrorViewComponent];
const _pipes = [LocalizePipe, CurrencySymbolPipe];
@NgModule({
  imports: [CommonModule, NgbModule],
  declarations: [...directives, ...components, ..._pipes],
  exports: [...directives, ...components, ..._pipes],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        {
          provide: ErrorHandler,
          useClass: GlobalErrorHandler,
        },
        { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
        NWTokenService,
        LoginService,
      ],
    };
  }
}
