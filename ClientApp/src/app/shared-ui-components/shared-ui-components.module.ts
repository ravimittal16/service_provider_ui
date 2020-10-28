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
import { AddressCardComponent } from "./address-card/address-card.component";
import { DatetimePickerComponent } from "./datetime-picker/datetime-picker.component";
import { CustomerSelectorInputComponent } from "./customer-selector-input/customer-selector-input.component";

const __exportableComponents = [
  CollapsibleCardComponent,
  InputSelectorComponentComponent,
  InputSelectorDirectiveDirective,
  AddressModalComponent,
  AddressCardComponent,
  DatetimePickerComponent,
  CustomerSelectorInputComponent,
];

@NgModule({
  declarations: [...__exportableComponents],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule],
  providers: [UiComponentsServiceService, UiAlertsService],
  exports: [...__exportableComponents],
})
export class SharedUiComponentsModule {}
