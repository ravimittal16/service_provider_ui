import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { TaxSettingsCardComponent } from "../tax-settings-card/tax-settings-card.component";

@Component({
  selector: "app-company",
  templateUrl: "./company.component.html",
  styleUrls: ["./company.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyComponent implements OnInit, AfterViewInit {
  @ViewChild("taxesComponent") taxesComponent: TaxSettingsCardComponent;
  companyFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _Cdr: ChangeDetectorRef
  ) {}

  disconnectAccount(): void {}
  private _initFormGroup() {
    this.companyFormGroup = this._formBuilder.group({
      givenName: [""],
    });
  }
  ngOnInit(): void {
    this._initFormGroup();
  }
  ngAfterViewInit(): void {
    console.log(this.taxesComponent);
  }
}
