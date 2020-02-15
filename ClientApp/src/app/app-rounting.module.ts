import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CounterComponent } from "./counter/counter.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";

const rountingComponents = [
  HomeComponent,
  CounterComponent,
  FetchDataComponent
];

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: "home", component: HomeComponent, pathMatch: "full" },
      { path: "counter", component: CounterComponent },
      { path: "fetch-data", component: FetchDataComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
