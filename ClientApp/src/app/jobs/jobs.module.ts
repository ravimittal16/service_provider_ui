import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedUiComponentsModule } from "@app/shared-ui-components/shared-ui-components.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { SharedModule } from "@shared/shared.module";
import { AddJobModalComponent } from './add-job-modal/add-job-modal.component';
import { JobsDataService } from './jobs.data.service';
import { JobsRoutingModule, routeComponents } from "./jobs.routing.module";

const __modalComponents = [AddJobModalComponent]

@NgModule({
  declarations: [routeComponents,...__modalComponents],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    JobsRoutingModule,
    SharedUiComponentsModule,
  ],
  exports: [],
  providers: [JobsDataService],
})
export class JobsModule {}
