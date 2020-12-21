import { Component, OnDestroy, OnInit } from "@angular/core";
import { SettingsModalService } from "@app/settings/settings.modal.service";
import { CompanyFacade, ExpenseFacade } from "@core-data/index";
import { AppConsts } from "@shared/AppConsts";

import { SubscribedFeaturesDto } from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";
import { SubSink } from "subsink";

@Component({
  selector: "app-expense-codes",
  templateUrl: "./expense-codes.component.html",
  styleUrls: ["./expense-codes.component.scss"],
})
export class ExpenseCodesComponent implements OnInit, OnDestroy {
  features$: Observable<SubscribedFeaturesDto[]>;
  showBanner = false;
  private _subs = new SubSink();
  constructor(
    private _companyFacde: CompanyFacade,
    private _expenseFacade: ExpenseFacade,
    private _settingsModalService: SettingsModalService
  ) {
    this.features$ = _companyFacde.features$;
  }

  addNewExpenseCode() {
    const _modal = this._settingsModalService.openExpenseCodeModal();
  }

  private __checkFeatureSubscription() {
    this._subs.add(
      this.features$.subscribe((features) => {
        if (features && features.length > 0) {
          const __expenseFeatureSubscription = features.find(
            (x) =>
              x.featureId ===
                AppConsts.FeatureKeys.EXPENSE_TRACKING_FEATURE_ID &&
              x.subscriptonId > 0
          );
          this.showBanner = __expenseFeatureSubscription === undefined;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  ngOnInit(): void {
    this.__checkFeatureSubscription();
    this._expenseFacade.fetchAllExpenseCodes();
  }
}
