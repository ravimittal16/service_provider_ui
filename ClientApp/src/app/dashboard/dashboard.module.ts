import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { CoreDataModule } from "@core-data/core.data.module";
import { SharedModule } from "@shared/shared.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [DashboardComponent, WelcomeComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgbModule,
    SharedModule,
    CoreDataModule,
  ],
})
export class DashboardModule {}
