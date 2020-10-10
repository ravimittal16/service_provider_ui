import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedUiComponentsModule } from "@app/shared-ui-components/shared-ui-components.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { SharedModule } from "@shared/shared.module";
import { JobsRoutingModule, routeComponents } from "./jobs.routing.module";

@NgModule({
  declarations: [routeComponents],
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
  providers: [],
})
export class JobsModule {}
