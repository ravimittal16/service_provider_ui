import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditJobViewComponent } from "./edit-job-view/edit-job-view.component";

import { JobsKanbanViewComponent } from "./jobs-kanban-view/jobs-kanban-view.component";
import { JobsMainComponent } from "./jobs-main/jobs.main.component";
import { JobsMapViewComponent } from "./jobs-map-view/jobs-map-view.component";
import { JobsViewComponent } from "./jobs-view/jobs-view.component";

const routes: Routes = [
  {
    path: "",
    component: JobsMainComponent,
    children: [
      { path: "view", component: JobsViewComponent },
      { path: "mapView", component: JobsMapViewComponent },
      { path: "kanbanView", component: JobsKanbanViewComponent },
      { path: "editJob/:jobId", component: EditJobViewComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class JobsRoutingModule {}

export const routeComponents = [
  JobsMainComponent,
  JobsViewComponent,
  JobsMapViewComponent,
  JobsKanbanViewComponent,
  EditJobViewComponent,
];
