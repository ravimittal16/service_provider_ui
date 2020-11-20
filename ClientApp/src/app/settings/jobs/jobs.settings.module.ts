import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { JobFormsComponent } from "./job-forms/job-forms.component";
import { JobConfigurationsComponent } from "./job-configurations/job-configurations.component";
import { NgxMaskModule } from "ngx-mask";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

const routes: Routes = [
  { path: "forms", component: JobFormsComponent },
  { path: "config", component: JobConfigurationsComponent },
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class JobsSettingsModule {}
