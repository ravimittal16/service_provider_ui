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
import {
  CompanyDetailsModel,
  AddressDto,
  CommonDataModel,
  LookupValueModel,
} from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";
import { SubSink } from "subsink";
import { withLatestFrom, distinctUntilChanged, tap } from "rxjs/operators";
import { GenericValidator } from "@shared/helpers/GenericValidator";

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
  commonData$: Observable<CommonDataModel>;
  commonData: CommonDataModel;
  companyAddresses: AddressDto[];
  dateFormats: LookupValueModel[];
  private _subs = new SubSink();
  private _validator: GenericValidator;
  constructor(
    private _formBuilder: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _copmanyFacade: CompanyFacade
  ) {
    this.companyDetails$ = _copmanyFacade.copmanyDetails$;
    this.commonData$ = _copmanyFacade.commonData$;
  }

  disconnectAccount(): void {}

  private _initFormGroup() {
    this.companyFormGroup = this._formBuilder.group({
      companyName: ["", [Validators.required]],
      primaryPhone: [""],
      email: ["", [Validators.required]],
      webAddr: [""],
    });
    this._validator = new GenericValidator(this.companyFormGroup);
  }

  private _bindCompanyData(details: CompanyDetailsModel) {
    this._validator.patchValues(details);
    this.companyAddresses = details.compAddresses;
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
      this._subs.add(
        this.commonData$
          .pipe(
            tap((data) => {
              this.commonData = data;
              this.dateFormats = data.lookupValues?.filter(
                (x) => x.type === "DateFormat"
              );
            })
          )
          .subscribe()
      );
    }
  }

  ngAfterViewInit(): void {}
}
