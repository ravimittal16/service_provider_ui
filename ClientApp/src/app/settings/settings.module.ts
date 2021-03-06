import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SettingsRoutingModule } from "./settings-routing.module";
import { CompanyComponent } from "./company/company.component";
import { MainComponent } from "./main/main.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrandingComponent } from "./branding/branding.component";
import { CustomFieldsComponent } from "./custom-fields/custom-fields.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BusinessHoursCardComponent } from "./business-hours-card/business-hours-card.component";
import { TaxSettingsCardComponent } from "./tax-settings-card/tax-settings-card.component";
import { SharedUiComponentsModule } from "@app/shared-ui-components/shared-ui-components.module";

import { SharedModule } from "@shared/shared.module";
import { SettingsModalService } from "./settings.modal.service";
import { AddUpdateCustomFieldModalComponent } from "./custom-fields/add-update-custom-field-modal/add-update-custom-field-modal.component";

const __modalComponents = [AddUpdateCustomFieldModalComponent];

@NgModule({
  declarations: [
    CompanyComponent,
    MainComponent,
    BrandingComponent,
    CustomFieldsComponent,
    BusinessHoursCardComponent,
    TaxSettingsCardComponent,
    ...__modalComponents,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    NgbModule,
    SharedUiComponentsModule,
  ],
  providers: [SettingsModalService],
})
export class SettingsModule {}
