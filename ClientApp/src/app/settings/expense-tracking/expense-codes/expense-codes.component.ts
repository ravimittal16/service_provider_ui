import { Component, OnInit } from "@angular/core";
import { CompanyFacade } from "@core-data/index";
import { AppConsts } from "@shared/AppConsts";

import { SubscribedFeaturesDto } from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";

@Component({
  selector: "app-expense-codes",
  templateUrl: "./expense-codes.component.html",
  styleUrls: ["./expense-codes.component.scss"],
})
export class ExpenseCodesComponent implements OnInit {
  features$: Observable<SubscribedFeaturesDto[]>;
  showBanner = false;
  constructor(private _companyFacde: CompanyFacade) {
    this.features$ = _companyFacde.features$;
  }

  ngOnInit(): void {
    this.features$.subscribe((features) => {
      if (features && features.length > 0) {
        const __expenseFeatureSubscription = features.find(
          (x) =>
            x.featureId === AppConsts.FeatureKeys.EXPENSE_TRACKING_FEATURE_ID &&
            x.subscriptonId > 0
        );
        this.showBanner = __expenseFeatureSubscription === undefined;
      }
    });
  }
}
