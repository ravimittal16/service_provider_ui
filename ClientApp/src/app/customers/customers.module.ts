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
import { CustomerDetailComponent } from "./customer-detail/customer-detail.component";
import { CustomerEditCreateModalComponent } from "./customer-edit-create-modal/customer-edit-create-modal.component";
import { SharedUiComponentsModule } from "@app/shared-ui-components/shared-ui-components.module";
import { NgxMaskModule, IConfig } from "ngx-mask";

const cellRenderers = [
  CustomerDisplayNameLinkCellRenderer,
  EmailAddressLinkCellRenderer,
  CustomerActionsCellRenderer,
];

const _routeComponents = [ListComponent, CustomerDetailComponent];
@NgModule({
  declarations: [
    ..._routeComponents,
    ...cellRenderers,
    CustomerEditCreateModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    AgGridModule.withComponents([...cellRenderers]),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CustomersRoutingModule,
    CoreDataModule,
    SharedUiComponentsModule,
  ],
})
export class CustomersModule {}
