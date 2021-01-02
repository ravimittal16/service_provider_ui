import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomFieldsFacade } from "@core-data/index";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
  CustomFieldDefinationModel,
  CustomFieldEntityType,
  CustomFieldType,
} from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";
import { SubSink } from "subsink";

@Component({
  selector: "app-add-update-custom-field-modal",
  templateUrl: "./add-update-custom-field-modal.component.html",
  styleUrls: ["./add-update-custom-field-modal.component.scss"],
})
export class AddUpdateCustomFieldModalComponent implements OnInit, OnDestroy {
  selectedEntityType$: Observable<CustomFieldEntityType>;
  fieldTypes$: Observable<CustomFieldType[]>;
  customFieldDefinationFormGroup: FormGroup;
  title: string;
  private _subs = new SubSink();
  constructor(
    private _fb: FormBuilder,
    private _customFieldsFacade: CustomFieldsFacade,
    private _activeModal: NgbActiveModal
  ) {
    this.selectedEntityType$ = _customFieldsFacade.selectedEntityType$;
    this.fieldTypes$ = _customFieldsFacade.fieldTypes$;
  }

  onCancelClicked(): void {
    this._activeModal.dismiss(null);
  }

  onSaveButtonClicked(): void {
    const __data = this.customFieldDefinationFormGroup.getRawValue() as CustomFieldDefinationModel;
    if (__data) {
      this._customFieldsFacade.addUpdateCustomField(__data, this._activeModal);
    }
  }

  get selectedFieldTypeId(): number {
    const __formFieldTypeVal = this.customFieldDefinationFormGroup.get(
      "fieldTypeId"
    ).value;
    if (__formFieldTypeVal) return __formFieldTypeVal;
    return -1;
  }

  private _initCustomFieldFormGroup(
    customFieldEntityType: CustomFieldEntityType
  ) {
    this.customFieldDefinationFormGroup = this._fb.group({
      definationId: [0],
      appliesToCustomTypeId: [customFieldEntityType.entityType],
      label: ["", [Validators.required, Validators.maxLength(100)]],
      isRequired: [false],
      isTransferable: [false],
      defaultValue: [null, [Validators.maxLength(500)]],
      defaultValue2: [null, [Validators.maxLength(500)]],
      valueType: [null, [Validators.maxLength(50)]],
      fieldTypeId: [null],
      displayOrder: [0],
    });
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  ngOnInit(): void {
    this._subs.add(
      this.selectedEntityType$.subscribe((entityType) => {
        if (entityType) {
          this._initCustomFieldFormGroup(entityType);
          this.title = `Add custom field for ${entityType.entityName}`;
        }
      })
    );
  }
}
