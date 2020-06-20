import { ModuleWithProviders, NgModule } from "@angular/core";
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

const directives = [BlockDirective, BusyDirective];
const components = [AppErrorViewComponent];
@NgModule({
  imports: [CommonModule],
  declarations: [LocalizePipe, AppLogoComponent, ...directives, ...components],
  exports: [LocalizePipe, AppLogoComponent, ...directives, ...components],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
        NWTokenService,
        LoginService,
      ],
    };
  }
}
