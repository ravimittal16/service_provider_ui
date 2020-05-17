import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CustomersRoutingModule } from "./customers-routing.module";

import { ListComponent } from "./list/list.component";

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, CustomersRoutingModule],
})
export class CustomersModule {}
