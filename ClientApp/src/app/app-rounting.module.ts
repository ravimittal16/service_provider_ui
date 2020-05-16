import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CounterComponent } from "./counter/counter.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { AppComponent } from "./app.component";

export const rountingComponents = [
  HomeComponent,
  CounterComponent,
  FetchDataComponent,
];

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: AppComponent,
        children: [
          { path: "home", component: HomeComponent },
          { path: "counter", component: CounterComponent },
          { path: "fetch-data", component: FetchDataComponent },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
