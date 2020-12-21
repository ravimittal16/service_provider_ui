import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ExpenseCodesComponent } from "./expense-codes/expense-codes.component";
import { ExpenseTrackingBannerComponent } from "./expense-tracking-banner/expense-tracking-banner.component";
import { ExpenseModule } from "@app/expense-module/expense.module";

const routes: Routes = [{ path: "codes", component: ExpenseCodesComponent }];

const __rouetComponents = [ExpenseCodesComponent];
const __otherComponents = [ExpenseTrackingBannerComponent];
export const EXPENSE_TRACKING_FEATURE_ID = 1;
@NgModule({
  declarations: [...__rouetComponents, ...__otherComponents],
  imports: [CommonModule, ExpenseModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpenseTrackingModule {}
