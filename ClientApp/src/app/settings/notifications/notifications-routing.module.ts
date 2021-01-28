import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotificationsComponent } from "./notifications/notifications.component";
import { TemplatesComponent } from "./templates/templates.component";

const routes: Routes = [
  { path: "configurations", component: NotificationsComponent },
  { path: "templates", component: TemplatesComponent },
];

export const routesComponents = [NotificationsComponent, TemplatesComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsRoutingModule {}
