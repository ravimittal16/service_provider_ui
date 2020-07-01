import { ModuleWithProviders, NgModule, ErrorHandler } from "@angular/core";
import { LocalizePipe } from "@shared/pipes/localize.pipe";
import { NWTokenService } from "@shared/services/token.service";
import { AppLogoComponent } from "@shared/logo/logo.component";
import { environment } from "../environments/environment";
import { BlockDirective } from "./directives/block.directive";
import { BusyDirective } from "./directives/busy.directive";
import { AppErrorViewComponent } from "./error-view/error.view.component";
import { CommonModule } from "@angular/common";
import { API_BASE_URL } from "./service-proxies/service-proxies";
import { LoginService } from "./services/login.service";

import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MAT_RIPPLE_GLOBAL_OPTIONS } from "@angular/material/core";
import { GlobalErrorHandler } from "./infrastructure/GlobalErrorHandler";

const directives = [BlockDirective, BusyDirective];
const components = [AppErrorViewComponent];

const matModules = [MatButtonModule, MatMenuModule, MatIconModule];
@NgModule({
  imports: [CommonModule, ...matModules],
  declarations: [LocalizePipe, AppLogoComponent, ...directives, ...components],
  exports: [
    LocalizePipe,
    AppLogoComponent,
    ...directives,
    ...components,
    ...matModules,
  ],
  providers: [
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: { disabled: true } },
  ],
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
