import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ErrorRenderer } from "@shared/helpers/ErrorRenderer";
import { BehaviorSubject, Observable } from "rxjs";

@Component({
  selector: "app-custom-fields",
  templateUrl: "./custom-fields.component.html",
  styleUrls: ["./custom-fields.component.scss"],
})
export class CustomFieldsComponent implements OnInit {
  customFieldDetailGroup: FormGroup;
  private __errorRenderer = new ErrorRenderer();
  errors$: Observable<string[]>;
  constructor(private _fb: FormBuilder) {
    this.errors$ = this.__errorRenderer.errors$;
  }

  private _initFormControl() {
    this.customFieldDetailGroup = this._fb.group({
      entityType: ["", [Validators.required]],
    });
  }

  onEntityTypeSelected(): void {}

  addNewCustomTypeClicked(): void {}

  ngOnInit(): void {
    this._initFormControl();
  }
}
