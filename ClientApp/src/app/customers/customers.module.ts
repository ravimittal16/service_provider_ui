import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CustomersRoutingModule } from "./customers-routing.module";

import { ListComponent } from "./list/list.component";
import { SharedModule } from "@shared/shared.module";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    CustomersRoutingModule,
  ],
})
export class CustomersModule {}
