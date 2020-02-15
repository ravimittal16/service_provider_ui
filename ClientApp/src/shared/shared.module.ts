import { ModuleWithProviders, NgModule } from "@angular/core";
import { LocalizePipe } from "@shared/pipes/localize.pipe";
import { NWTOkenService } from "@shared/services/token.service";
@NgModule({
  declarations: [LocalizePipe],
  exports: [LocalizePipe]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [NWTOkenService]
    };
  }
}
