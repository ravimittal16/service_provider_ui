import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersListComponent } from "./users-list/users-list.component";
import { SharedUiComponentsModule } from "@app/shared-ui-components/shared-ui-components.module";
import { NgxMaskModule } from "ngx-mask";
import { AgGridModule } from "ag-grid-angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CoreDataModule } from "@core-data/core.data.module";
import { RouterModule, Routes } from "@angular/router";
import { AddEditUserModalComponent } from "./add-edit-user-modal/add-edit-user-modal.component";
import { SharedModule } from "@shared/shared.module";
import { ColorPickerModule } from "ngx-color-picker";
import { UsersActionsCellRenderer } from "./grid-cell-renderers/users.actions.cell.renderer";
import { CurrencyValueCellRenderer } from "@shared/grid-cell-renderers/currency.value.cell.renderer";

const routes: Routes = [{ path: "list", component: UsersListComponent }];
const _gridCellRenderers = [
  UsersActionsCellRenderer,
  CurrencyValueCellRenderer,
];

@NgModule({
  declarations: [UsersListComponent, AddEditUserModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    ColorPickerModule,
    SharedUiComponentsModule,
    NgxMaskModule.forRoot(),
    AgGridModule.withComponents([..._gridCellRenderers]),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CoreDataModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ManageUsersModuleModule {}
