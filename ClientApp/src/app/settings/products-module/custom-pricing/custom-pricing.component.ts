import { Component, OnInit } from "@angular/core";
import { CompanyFacade } from "@core-data/index";
import { AppConsts } from "@shared/AppConsts";
import { SubscribedFeaturesDto } from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";
import { SubSink } from "subsink";

@Component({
  selector: "app-custom-pricing",
  templateUrl: "./custom-pricing.component.html",
  styleUrls: ["./custom-pricing.component.scss"],
})
export class CustomPricingComponent implements OnInit {
  features$: Observable<SubscribedFeaturesDto[]>;
  showBanner = false;
  private _subs = new SubSink();
  constructor(private _companyFacde: CompanyFacade) {
    this.features$ = _companyFacde.features$;
  }

  private __checkFeatureSubscription() {
    this._subs.add(
      this.features$.subscribe((features) => {
        if (features && features.length > 0) {
          const __featureSubscriptionStatus = features.find(
            (x) =>
              x.featureId === AppConsts.FeatureKeys.CUSTOM_PRICING &&
              x.subscriptonId > 0
          );
          this.showBanner = __featureSubscriptionStatus === undefined;
        }
      })
    );
  }

  ngOnInit(): void {
    this.__checkFeatureSubscription();
  }
}
