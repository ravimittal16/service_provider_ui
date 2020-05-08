import { ModuleWithProviders, NgModule } from "@angular/core";
import { LocalizePipe } from "@shared/pipes/localize.pipe";
import { NWTOkenService } from "@shared/services/token.service";
import { AppLogoComponent } from "@shared/logo/logo.component";

import { BlockDirective } from "./directives/block.directive";
import { BusyDirective } from "./directives/busy.directive";

const directive = [BlockDirective, BusyDirective];
@NgModule({
  declarations: [LocalizePipe, AppLogoComponent, ...directive],
  exports: [LocalizePipe, AppLogoComponent, ...directive],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [NWTOkenService],
    };
  }
}
