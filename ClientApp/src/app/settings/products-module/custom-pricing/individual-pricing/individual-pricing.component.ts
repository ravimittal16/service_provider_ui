import { Component, OnDestroy, OnInit } from "@angular/core";
import { UiComponentsService } from "@app/shared-ui-components/ui.components.service";
import { ProductDto } from "@shared/service-proxies/service-proxies";

@Component({
  selector: "app-individual-pricing",
  templateUrl: "./individual-pricing.component.html",
  styleUrls: ["./individual-pricing.component.scss"],
})
export class IndividualPricingComponent implements OnInit, OnDestroy {
  constructor(private _uiComponentsService: UiComponentsService) {}

  addProductClicked(): void {
    this._uiComponentsService.openProductSelectorModal(
      true,
      "Indiviual Pricing | Add Product",
      false,
      (product: ProductDto) => {
        console.log(product);
      }
    );
  }

  exportListClicked(): void {}

  ngOnDestroy(): void {
    console.log("Method not implemented.");
  }

  ngOnInit(): void {}
}
