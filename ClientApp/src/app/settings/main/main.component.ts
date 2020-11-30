import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CompanyFacade } from "@core-data/company-store/company.facade";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  constructor(private _router: Router, private _companyFacade: CompanyFacade) {}

  goToRoute(routeName: string): void {
    if (routeName) {
      this._router.navigate([routeName]);
    }
  }
  ngOnInit(): void {
    // ==========================================================
    // LOADING COMMON DATA
    // ==========================================================
    this._companyFacade.loadApplicationData();
    this._companyFacade.getFeatues();
  }
}
