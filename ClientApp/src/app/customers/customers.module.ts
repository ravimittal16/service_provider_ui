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
import { CustomerActionsCellRenderer } from "./grid-cell-renderers/row.actions.cell.renderer";

const cellRenderers = [
  CustomerDisplayNameLinkCellRenderer,
  EmailAddressLinkCellRenderer,
  CustomerActionsCellRenderer,
];
@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    SharedModule,
    AgGridModule.withComponents([...cellRenderers]),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CustomersRoutingModule,
    CoreDataModule,
  ],
})
export class CustomersModule {}
