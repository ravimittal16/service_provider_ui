import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { JobFormsComponent } from "./job-forms/job-forms.component";
import { JobConfigurationsComponent } from "./job-configurations/job-configurations.component";
import { NgxMaskModule } from "ngx-mask";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NewJobFormComponent } from "./new-job-form/new-job-form.component";

import { SharedModule } from "@shared/shared.module";
import { JobFormsBannerComponent } from "./job-forms-banner/job-forms-banner.component";
import { SharedUiComponentsModule } from "@app/shared-ui-components/shared-ui-components.module";

export const JOB_FORMS_FEATURE_ID = 2;

const routes: Routes = [
  { path: "forms", component: JobFormsComponent },

  { path: "job-form", component: NewJobFormComponent },

  { path: "config", component: JobConfigurationsComponent },
];
@NgModule({
  declarations: [
    JobFormsComponent,
    NewJobFormComponent,
    JobConfigurationsComponent,
    JobFormsBannerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedUiComponentsModule,
    NgxMaskModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class JobsSettingsModule {}
