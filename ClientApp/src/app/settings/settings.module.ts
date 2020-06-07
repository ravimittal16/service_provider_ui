import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { CompanyComponent } from './company/company.component';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [CompanyComponent, MainComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
