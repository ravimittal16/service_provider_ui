import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: "app-individual-pricing",
  templateUrl: "./individual-pricing.component.html",
  styleUrls: ["./individual-pricing.component.scss"],
})
export class IndividualPricingComponent implements OnInit, OnDestroy {
  constructor() {}
  ngOnDestroy(): void {
    console.log("Method not implemented.");
  }

  ngOnInit(): void {}
}
