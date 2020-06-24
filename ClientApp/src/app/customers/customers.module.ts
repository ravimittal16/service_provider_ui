import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CustomersRoutingModule } from "./customers-routing.module";
import { AgGridModule } from "ag-grid-angular";
import { ListComponent } from "./list/list.component";
import { SharedModule } from "@shared/shared.module";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CoreDataModule } from "@core-data/core.data.module";
import { CustomerDisplayNameLinkCellRenderer } from "./grid-cell-renderers/display-name.link.cell.renderer";
import { EmailAddressLinkCellRenderer } from "@shared/grid-cell-renderers/email.address.cell.renderer";

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
    AgGridModule.withComponents([
      CustomerDisplayNameLinkCellRenderer,
      EmailAddressLinkCellRenderer,
    ]),
  ],
})
export class CustomersModule {}
