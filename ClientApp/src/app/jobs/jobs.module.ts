import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedUiComponentsModule } from "@app/shared-ui-components/shared-ui-components.module";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { SharedModule } from "@shared/shared.module";
import { ColorPickerModule } from "ngx-color-picker";
import { AddJobModalComponent } from "./add-job-modal/add-job-modal.component";
import { AddJobVisitModalComponent } from "./add-job-visit-modal/add-job-visit-modal.component";
import { JobCardListItemComponent } from "./job-card-list-item/job-card-list-item.component";
import { JobItemsListViewComponent } from "./job-items-list-view/job-items-list-view.component";
import { JobItemsTableViewComponent } from "./job-items-table-view/job-items-table-view.component";
import { JobVisitDetailModalComponent } from "./job-visit-detail-modal/job-visit-detail-modal.component";
import { JobVisitsViewComponent } from "./job-visits-view/job-visits-view.component";
import { JobsFilterComponent } from "./jobs-filter/jobs-filter.component";
import { JobsDataService } from "./jobs.data.service";
import { JobsModalService } from "./jobs.modal.service";
import { JobsRoutingModule, routeComponents } from "./jobs.routing.module";

const __modalComponents = [
  AddJobModalComponent,
  JobVisitDetailModalComponent,
  AddJobVisitModalComponent,
];
const __moduleComponents = [
  JobsFilterComponent,
  JobCardListItemComponent,
  JobItemsListViewComponent,
  JobVisitsViewComponent,
  JobItemsTableViewComponent,
];
@NgModule({
  declarations: [routeComponents, ...__modalComponents, ...__moduleComponents],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    NgbModule,
    JobsRoutingModule,
    SharedUiComponentsModule,
  ],
  exports: [],
  providers: [JobsDataService, JobsModalService],
})
export class JobsModule {}
