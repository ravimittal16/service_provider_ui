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
  TimezoneModel,
} from "@shared/service-proxies/service-proxies";
import { Observable, BehaviorSubject } from "rxjs";
import { SubSink } from "subsink";
import {
  withLatestFrom,
  distinctUntilChanged,
  tap,
  switchMap,
} from "rxjs/operators";
import { GenericValidator } from "@shared/helpers/GenericValidator";
import { AppConsts } from "@shared/AppConsts";

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
  private readonly refreshTimezones$ = new BehaviorSubject(undefined);
  timezones$: Observable<TimezoneModel[]>;
  commonData: CommonDataModel;
  companyAddresses: AddressDto[];
  dateFormats: LookupValueModel[];
  private _subs = new SubSink();
  private _validator: GenericValidator;
  weekdays = AppConsts.WeekDays;
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
      timeZoneStandardName: [""],
      firstDayOfWeek: [1],
      webAddr: [""],
      country: [""],
      dateFormat: [""],
      timeFormat: [""],
    });
    this._validator = new GenericValidator(this.companyFormGroup);
  }

  addressTrackByFn(index: number, address: AddressDto) {
    return index;
  }

  private _bindCompanyData(details: CompanyDetailsModel) {
    this._validator.patchValues(details);
    this.companyAddresses = details.compAddresses;
  }

  private __processUpdateCompanySettings() {
    const model = this.companyFormGroup.getRawValue();
    model.taxRates = this.taxesComponent.getAllTaxes();
    this._copmanyFacade.updateCompanyDetails(model).subscribe((response) => {
      if (response.isSuccess) {
        console.log(response);
      }
    });
  }

  updateCompanySettings() {
    if (this.taxesComponent) {
      this.taxesComponent.getAllTaxes();
      this.taxesComponent.isValidTaxRatesForms().then((__taxFormResponse) => {
        if (__taxFormResponse.isValid) {
          this.__processUpdateCompanySettings();
        } else {
          this.taxesComponent.showInvalidStateMessage();
        }
      });
    }
  }

  onCountryChanged(): void {
    // this.refreshTimezones$.next(undefined);
  }

  private refreshTimezones(firstTime: boolean): void {
    this.timezones$ = this.refreshTimezones$.pipe(
      switchMap(() => {
        let _countryCode = this.companyFormGroup.get("country").value;
        return this._copmanyFacade.getCountryTimezones(_countryCode);
      })
    );
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
    this.refreshTimezones(true);
  }

  ngAfterViewInit(): void {}
}
