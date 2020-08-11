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
import { CoreDataModule } from "@core-data/core.data.module";
import { CompanyStoreModule } from "@core-data/company-store/company.store.module";

@NgModule({
  declarations: [
    CompanyComponent,
    MainComponent,
    BrandingComponent,
    CustomFieldsComponent,
    BusinessHoursCardComponent,
    TaxSettingsCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    CoreDataModule,
    NgbModule,
    SharedUiComponentsModule,
  ],
})
export class SettingsModule {}
