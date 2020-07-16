import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AddressModalComponent } from "./address-modal/address-modal.component";
import { UiComponentsServiceService } from "./ui-components-service.service";
import { UiAlertsService } from "./ui.alerts.service";
import { CollapsibleCardComponent } from "./collapsible-card/collapsible-card.component";

@NgModule({
  declarations: [AddressModalComponent, CollapsibleCardComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule],
  providers: [UiComponentsServiceService, UiAlertsService],
  exports: [CollapsibleCardComponent],
})
export class SharedUiComponentsModule {}
