import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ErrorRenderer } from "@shared/helpers/ErrorRenderer";
import { BehaviorSubject, Observable } from "rxjs";
export class CustomFieldEntityType {
  entityTypeId: number;
  entityName: string;
  maxAllowed: number;
}
@Component({
  selector: "app-custom-fields",
  templateUrl: "./custom-fields.component.html",
  styleUrls: ["./custom-fields.component.scss"],
})
export class CustomFieldsComponent implements OnInit {
  customFieldDetailGroup: FormGroup;
  private __errorRenderer = new ErrorRenderer();
  errors$: Observable<string[]>;
  entityTypes: CustomFieldEntityType[] = [];
  constructor(private _fb: FormBuilder) {
    this.errors$ = this.__errorRenderer.errors$;
  }

  private _initFormControl() {
    this.customFieldDetailGroup = this._fb.group({
      entityType: ["", [Validators.required]],
    });
  }

  _bindTypes() {
    this.entityTypes = [
      {
        entityName: "",
        entityTypeId: 0,
        maxAllowed: 2,
      },
    ];
  }

  onEntityTypeSelected(): void {}

  addNewCustomTypeClicked(): void {}

  ngOnInit(): void {
    this._initFormControl();
  }
}
