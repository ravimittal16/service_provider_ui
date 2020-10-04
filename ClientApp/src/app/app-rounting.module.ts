import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";

import { AppComponent } from "./app.component";

export const rountingComponents = [HomeComponent];

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: AppComponent,
        children: [
          { path: "home", component: HomeComponent },
          {
            path: "main",
            loadChildren: () =>
              import("./dashboard/dashboard.module").then(
                (m) => m.DashboardModule
              ),
          },
          {
            path: "customers",
            loadChildren: () =>
              import("./customers/customers.module").then(
                (m) => m.CustomersModule
              ),
          },
          {
            path: "settings",
            loadChildren: () =>
              import("./settings/settings.module").then(
                (m) => m.SettingsModule
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
