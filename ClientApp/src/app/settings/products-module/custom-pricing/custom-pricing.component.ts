import { Component, OnInit } from "@angular/core";
import { CompanyFacade, CustomPricingFacade } from "@core-data/index";
import { ProductsFacade } from "@core-data/products-store/products.facade";
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
  constructor(
    private _productsFacade: ProductsFacade,
    private _companyFacde: CompanyFacade,
    private _customPricingFacde: CustomPricingFacade
  ) {
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
          if (!this.showBanner) {
            this._customPricingFacde.fetchAllPricingGrpups();
            this._customPricingFacde.fetchAllIndividualPricing();
            this._productsFacade.loadProducts();
          }
        }
      })
    );
  }

  ngOnInit(): void {
    this.__checkFeatureSubscription();
  }
}
