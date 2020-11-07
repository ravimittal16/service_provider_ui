import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CompanyComponent } from "./company/company.component";
import { MainComponent } from "./main/main.component";
import { BrandingComponent } from "./branding/branding.component";
import { CustomFieldsComponent } from "./custom-fields/custom-fields.component";
import { JobConfigurationsComponent } from "./job-configurations/job-configurations.component";

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      { path: "company", component: CompanyComponent },
      { path: "branding", component: BrandingComponent },
      { path: "cusflds", component: CustomFieldsComponent },
      { path: "job-configurations", component: JobConfigurationsComponent },
      {
        path: "products",
        loadChildren: () =>
          import("./products-module/products-module.module").then(
            (module) => module.ProductsModuleModule
          ),
      },
      {
        path: "users",
        loadChildren: () =>
          import("./manage-users-module/manage-users-module").then(
            (module) => module.ManageUsersModuleModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
