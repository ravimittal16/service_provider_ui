import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ListComponentComponent } from "./list-component/list-component.component";
import { CustomPricingComponent } from "./custom-pricing/custom-pricing.component";
import { NgxMaskModule } from "ngx-mask";
import { AgGridModule } from "ag-grid-angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CoreDataModule } from "@core-data/core.data.module";
import { TrueFalseValueCellRenderer } from "@shared/grid-cell-renderers/true.false.cell.renderer";
import { CurrencyValueCellRenderer } from "@shared/grid-cell-renderers/currency.value.cell.renderer";
import { SharedModule } from "@shared/shared.module";
import { ProductNameCellRenderer } from "./grid-cell-renderers/product.name.cell.renderer";
import { ProductActionsCellRenderer } from "./grid-cell-renderers/product.action.cell.renderer";

const routes: Routes = [
  { path: "list", component: ListComponentComponent },
  { path: "prdcts-cuspri", component: CustomPricingComponent },
];

const _gridCellRenderers = [
  TrueFalseValueCellRenderer,

  ProductNameCellRenderer,
  ProductActionsCellRenderer,
];
const sharedRenderers = [CurrencyValueCellRenderer];
@NgModule({
  declarations: [
    ListComponentComponent,
    CustomPricingComponent,
    ..._gridCellRenderers,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    AgGridModule.withComponents([..._gridCellRenderers, ...sharedRenderers]),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ProductsModuleModule {}
