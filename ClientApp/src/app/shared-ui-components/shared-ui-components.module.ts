import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AddressModalComponent } from "./address-modal/address-modal.component";
import { UiComponentsServiceService } from "./ui-components-service.service";
import { UiAlertsService } from "./ui.alerts.service";

@NgModule({
  declarations: [AddressModalComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule],
  providers: [UiComponentsServiceService, UiAlertsService],
})
export class SharedUiComponentsModule {}
