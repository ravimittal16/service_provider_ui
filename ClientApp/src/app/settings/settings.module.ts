import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SettingsRoutingModule } from "./settings-routing.module";
import { CompanyComponent } from "./company/company.component";
import { MainComponent } from "./main/main.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrandingComponent } from './branding/branding.component';
import { CustomFieldsComponent } from './custom-fields/custom-fields.component';

@NgModule({
  declarations: [CompanyComponent, MainComponent, BrandingComponent, CustomFieldsComponent],
  imports: [CommonModule, SettingsRoutingModule, NgbModule],
})
export class SettingsModule {}
