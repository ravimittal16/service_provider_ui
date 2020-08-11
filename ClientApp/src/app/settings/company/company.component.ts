import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TaxSettingsCardComponent } from "../tax-settings-card/tax-settings-card.component";
import { CompanyFacade } from "@core-data/company-store/company.facade";
import { CompanyDetailsModel } from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";
import { SubSink } from "subsink";
import { withLatestFrom, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-company",
  templateUrl: "./company.component.html",
  styleUrls: ["./company.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("taxesComponent") taxesComponent: TaxSettingsCardComponent;
  companyFormGroup: FormGroup;
  companyDetails$: Observable<CompanyDetailsModel>;
  private _subs = new SubSink();
  constructor(
    private _formBuilder: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _copmanyFacade: CompanyFacade
  ) {
    this.companyDetails$ = _copmanyFacade.copmanyDetails$;
  }

  disconnectAccount(): void {}

  private _initFormGroup() {
    this.companyFormGroup = this._formBuilder.group({
      companyName: ["", [Validators.required]],
      primaryPhone: [""],
    });
  }

  private _bindCompanyData(details: CompanyDetailsModel) {
    const __props = Object.keys(details);
    console.log(__props);
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  ngOnInit(): void {
    this._initFormGroup();
    this._copmanyFacade.loadCompanyDetails();
    if (this.companyDetails$) {
      this._subs.add(
        this.companyDetails$
          .pipe(distinctUntilChanged())
          .subscribe((details) => {
            if (details) {
              this._bindCompanyData(details);
            }
          })
      );
    }
  }

  ngAfterViewInit(): void {}
}
