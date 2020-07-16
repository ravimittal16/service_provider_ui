import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-company",
  templateUrl: "./company.component.html",
  styleUrls: ["./company.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyComponent implements OnInit {
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
}
