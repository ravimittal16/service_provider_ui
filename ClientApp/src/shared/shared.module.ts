import { ModuleWithProviders, NgModule } from "@angular/core";
import { LocalizePipe } from "@shared/pipes/localize.pipe";
import { NWTOkenService } from "@shared/services/token.service";
import { AppLogoComponent } from "@shared/logo/logo.component";
@NgModule({
  declarations: [LocalizePipe, AppLogoComponent],
  exports: [LocalizePipe, AppLogoComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [NWTOkenService]
    };
  }
}
