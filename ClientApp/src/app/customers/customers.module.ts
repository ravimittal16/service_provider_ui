import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CustomersRoutingModule } from "./customers-routing.module";
import { AgGridModule } from "ag-grid-angular";
import { ListComponent } from "./list/list.component";
import { SharedModule } from "@shared/shared.module";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CoreDataModule } from "@core-data/core.data.module";

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    CustomersRoutingModule,
    CoreDataModule,
    AgGridModule.withComponents([]),
  ],
})
export class CustomersModule {}
