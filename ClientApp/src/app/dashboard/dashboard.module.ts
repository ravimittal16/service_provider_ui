import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { SharedModule } from "@shared/shared.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { FullCalendarModule } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGrigPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { JobCalendarDayViewComponent } from "./job-calendar-day-view/job-calendar-day-view.component";

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGrigPlugin,
  interactionPlugin,
  listPlugin,
]);
@NgModule({
  declarations: [
    DashboardComponent,
    WelcomeComponent,
    JobCalendarDayViewComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgbModule,
    SharedModule,
    FullCalendarModule,
  ],
})
export class DashboardModule {}
