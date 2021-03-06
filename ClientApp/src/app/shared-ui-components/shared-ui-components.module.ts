import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AddressModalComponent } from "./address-modal/address-modal.component";
import { UiComponentsService } from "./ui.components.service";
import { UiAlertsService } from "./ui.alerts.service";
import { CollapsibleCardComponent } from "./collapsible-card/collapsible-card.component";
import { InputSelectorComponentComponent } from "./input-selector-component/input-selector-component.component";
import { InputSelectorDirectiveDirective } from "./input-selector-directive.directive";
import { AddressCardComponent } from "./address-card/address-card.component";
import { DatetimePickerComponent } from "./datetime-picker/datetime-picker.component";
import { CustomerSelectorInputComponent } from "./customer-selector-input/customer-selector-input.component";
import { ProductSelectorInputComponent } from "./product-selector-input/product-selector-input.component";
import { CustomerAddressSelectorModalComponent } from "./customer-address-selector-modal/customer-address-selector-modal.component";
import { SharedDataService } from "./shared.data.service";
import { ProductSelectorModalComponent } from "./product-selector-modal/product-selector-modal.component";
import { AgGridModule } from "ag-grid-angular";
import { ConfirmationActionsModalComponent } from "./confirmation-actions-modal/confirmation-actions-modal.component";
import { CustomItemsInputComponent } from "./custom-items-input/custom-items-input.component";
import { DeleteButtonComponent } from "./delete-button/delete-button.component";
import { CustomerSelectorModalComponent } from "./customer-selector-modal/customer-selector-modal.component";

const __exportableComponents = [
  CollapsibleCardComponent,
  InputSelectorComponentComponent,
  InputSelectorDirectiveDirective,
  AddressModalComponent,
  AddressCardComponent,
  DatetimePickerComponent,
  CustomerSelectorInputComponent,
  ProductSelectorInputComponent,
  CustomerAddressSelectorModalComponent,
  ProductSelectorModalComponent,
  ConfirmationActionsModalComponent,
  CustomItemsInputComponent,
  DeleteButtonComponent,
  CustomerSelectorModalComponent,
];

@NgModule({
  declarations: [...__exportableComponents],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    NgbModule,
  ],
  providers: [UiComponentsService, UiAlertsService, SharedDataService],
  exports: [...__exportableComponents],
})
export class SharedUiComponentsModule {}
