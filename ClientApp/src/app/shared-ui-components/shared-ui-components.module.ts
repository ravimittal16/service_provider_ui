import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AddressModalComponent } from "./address-modal/address-modal.component";
import { UiComponentsServiceService } from "./ui-components-service.service";
import { UiAlertsService } from "./ui.alerts.service";
import { CollapsibleCardComponent } from "./collapsible-card/collapsible-card.component";
import { InputSelectorComponentComponent } from "./input-selector-component/input-selector-component.component";
import { InputSelectorDirectiveDirective } from "./input-selector-directive.directive";

@NgModule({
  declarations: [
    AddressModalComponent,
    CollapsibleCardComponent,
    InputSelectorComponentComponent,
    InputSelectorDirectiveDirective,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule],
  providers: [UiComponentsServiceService, UiAlertsService],
  exports: [
    CollapsibleCardComponent,
    InputSelectorComponentComponent,
    InputSelectorDirectiveDirective,
  ],
})
export class SharedUiComponentsModule {}
