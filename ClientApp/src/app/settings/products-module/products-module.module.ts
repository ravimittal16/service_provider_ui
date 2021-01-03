import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ListComponentComponent } from "./list-component/list-component.component";
import { CustomPricingComponent } from "./custom-pricing/custom-pricing.component";
import { NgxMaskModule } from "ngx-mask";
import { AgGridModule } from "ag-grid-angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { TrueFalseValueCellRenderer } from "@shared/grid-cell-renderers/true.false.cell.renderer";
import { CurrencyValueCellRenderer } from "@shared/grid-cell-renderers/currency.value.cell.renderer";
import { ProductNameCellRenderer } from "./grid-cell-renderers/product.name.cell.renderer";
import { ProductActionsCellRenderer } from "./grid-cell-renderers/product.action.cell.renderer";
import { IndividualPricingComponent } from "./custom-pricing/individual-pricing/individual-pricing.component";
import { GroupsPricingComponent } from "./custom-pricing/groups-pricing/groups-pricing.component";
import { CustomPricingBannerComponent } from "./custom-pricing/custom-pricing-banner/custom-pricing-banner.component";

const routes: Routes = [
  { path: "list", component: ListComponentComponent },
  { path: "prdcts-cuspri", component: CustomPricingComponent },
];

const __gridCellRenderers = [
  TrueFalseValueCellRenderer,
  ProductNameCellRenderer,
  ProductActionsCellRenderer,
];
const sharedRenderers = [CurrencyValueCellRenderer];

const __routeComponents = [ListComponentComponent, CustomPricingComponent];

const __otherComponents = [
  CustomPricingBannerComponent,
  IndividualPricingComponent,
  GroupsPricingComponent,
];
@NgModule({
  declarations: [
    ...__routeComponents,
    ...__gridCellRenderers,
    ...__otherComponents,
  ],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(),
    AgGridModule.withComponents([...__gridCellRenderers, ...sharedRenderers]),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ProductsModuleModule {}
