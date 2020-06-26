import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";

import { AppRoutingModule } from "./app-rounting.module";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";

const _components = [NavMenuComponent, AppComponent, HomeComponent];
@NgModule({
  declarations: [..._components],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
})
export class AppModule {}
