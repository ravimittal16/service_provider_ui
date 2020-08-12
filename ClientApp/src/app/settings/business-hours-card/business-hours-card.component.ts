import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { CompanyFacade } from "@core-data/company-store/company.facade";
import { CompanyBusinessHourModel } from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";

@Component({
  selector: "app-business-hours-card",
  templateUrl: "./business-hours-card.component.html",
  styleUrls: ["./business-hours-card.component.scss"],
})
export class BusinessHoursCardComponent implements OnInit {
  businessHours$: Observable<CompanyBusinessHourModel[]>;
  editModeEnabled = false;
  constructor(
    private _cdr: ChangeDetectorRef,
    private _copmanyFacade: CompanyFacade
  ) {
    this.businessHours$ = this._copmanyFacade.businessHours$;
  }

  enableEditMode() {
    this.editModeEnabled = !this.editModeEnabled;
  }

  ngOnInit(): void {}
}
