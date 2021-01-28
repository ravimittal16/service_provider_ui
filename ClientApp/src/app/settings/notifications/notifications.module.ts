import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  NotificationsRoutingModule,
  routesComponents,
} from "./notifications-routing.module";
import { SharedModule } from "@shared/shared.module";

@NgModule({
  declarations: [...routesComponents],
  imports: [CommonModule, SharedModule, NotificationsRoutingModule],
  exports: [NotificationsRoutingModule],
})
export class NotificationsModule {}
