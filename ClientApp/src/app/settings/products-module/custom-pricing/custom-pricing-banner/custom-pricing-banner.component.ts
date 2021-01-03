import { Component, OnInit } from "@angular/core";
import { CompanyFacade } from "@core-data/index";
import { AppConsts } from "@shared/AppConsts";
import { SubscribedFeaturesDto } from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";

@Component({
  selector: "app-custom-pricing-banner",
  templateUrl: "./custom-pricing-banner.component.html",
  styleUrls: ["./custom-pricing-banner.component.scss"],
})
export class CustomPricingBannerComponent implements OnInit {
  private __featureId = AppConsts.FeatureKeys.CUSTOM_PRICING;
  features$: Observable<SubscribedFeaturesDto[]>;
  constructor(private _companyFacde: CompanyFacade) {
    this.features$ = _companyFacde.features$;
  }
  enableFeature() {
    this._companyFacde.updateFeatureSubscription(this.__featureId, true);
  }

  ngOnInit(): void {}
}
