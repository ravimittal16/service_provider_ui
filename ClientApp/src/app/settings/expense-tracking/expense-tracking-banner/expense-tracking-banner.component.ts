import { Component, OnInit } from "@angular/core";
import { CompanyFacade } from "@core-data/index";
import { AppConsts } from "@shared/AppConsts";
import { SubscribedFeaturesDto } from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";

@Component({
  selector: "app-expense-tracking-banner",
  templateUrl: "./expense-tracking-banner.component.html",
  styleUrls: ["./expense-tracking-banner.component.scss"],
})
export class ExpenseTrackingBannerComponent implements OnInit {
  private __featureId = AppConsts.FeatureKeys.EXPENSE_TRACKING_FEATURE_ID;
  features$: Observable<SubscribedFeaturesDto[]>;
  constructor(private _companyFacde: CompanyFacade) {
    this.features$ = _companyFacde.features$;
  }

  enableFeature() {
    this._companyFacde.updateFeatureSubscription(this.__featureId, true);
  }

  ngOnInit(): void {}
}
