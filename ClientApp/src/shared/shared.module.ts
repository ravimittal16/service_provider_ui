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
import { EmailAddressLinkCellRenderer } from "./grid-cell-renderers/email.address.cell.renderer";
import { CurrencyValueCellRenderer } from "./grid-cell-renderers/currency.value.cell.renderer";
import { ToastsGlobalComponent } from "./components/toasts-global/toasts-global.component";
import { ToastService } from "./services/toast.service";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ActionCodeUiRendererComponent } from "./components/action-code-ui-renderer/action-code-ui-renderer.component";

const sharedDirectives = [BlockDirective, BusyDirective];
const sharedComponents = [
  AppLogoComponent,
  AppErrorViewComponent,
  ToastsGlobalComponent,
  ActionCodeUiRendererComponent,
];
const sharedPipes = [LocalizePipe, CurrencySymbolPipe];
const sharedRenderers = [
  EmailAddressLinkCellRenderer,
  CurrencyValueCellRenderer,
];
@NgModule({
  imports: [CommonModule, NgbModule, DragDropModule],
  declarations: [
    ...sharedDirectives,
    ...sharedComponents,
    ...sharedPipes,
    ...sharedRenderers,
  ],
  exports: [
    ...sharedDirectives,
    ...sharedComponents,
    ...sharedPipes,
    ...sharedRenderers,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
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
        ToastService,
      ],
    };
  }
}
