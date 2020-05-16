import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { CounterComponent } from "./counter/counter.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { AppRoutingModule } from "./app-rounting.module";
import { CommonModule } from "@angular/common";

const _components = [
  NavMenuComponent,
  AppComponent,
  HomeComponent,
  CounterComponent,
  FetchDataComponent,
];
@NgModule({
  declarations: [..._components],
  imports: [CommonModule, HttpClientModule, FormsModule, AppRoutingModule],
  providers: [],
})
export class AppModule {}
