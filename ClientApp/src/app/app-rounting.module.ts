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
            path: "customers",
            loadChildren: () =>
              import("./customers/customers.module").then(
                (m) => m.CustomersModule
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
