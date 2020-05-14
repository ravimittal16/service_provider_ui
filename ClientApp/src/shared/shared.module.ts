import { ModuleWithProviders, NgModule } from "@angular/core";
import { LocalizePipe } from "@shared/pipes/localize.pipe";
import { NWTOkenService } from "@shared/services/token.service";
import { AppLogoComponent } from "@shared/logo/logo.component";

import { BlockDirective } from "./directives/block.directive";
import { BusyDirective } from "./directives/busy.directive";
import { AppErrorViewComponent } from "./error-view/error.view.component";
import { CommonModule } from "@angular/common";

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
      providers: [NWTOkenService],
    };
  }
}
