import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CompanyComponent } from "./company/company.component";
import { MainComponent } from "./main/main.component";
import { BrandingComponent } from "./branding/branding.component";
import { CustomFieldsComponent } from "./custom-fields/custom-fields.component";

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      { path: "company", component: CompanyComponent },
      { path: "branding", component: BrandingComponent },
      { path: "cusflds", component: CustomFieldsComponent },
      {
        path: "jobs",
        loadChildren: () =>
          import("./jobs/jobs.settings.module").then(
            (module) => module.JobsSettingsModule
          ),
      },
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
      {
        path: "expense",
        loadChildren: () =>
          import("./expense-tracking/expense-tracking.module").then(
            (module) => module.ExpenseTrackingModule
          ),
      },
      {
        path: "notifications",
        loadChildren: () =>
          import("./notifications/notifications.module").then(
            (module) => module.NotificationsModule
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
