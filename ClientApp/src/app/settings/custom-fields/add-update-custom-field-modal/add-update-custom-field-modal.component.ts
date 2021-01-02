import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomFieldsFacade } from "@core-data/index";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
  CustomFieldDefinationModel,
  CustomFieldDto,
  CustomFieldEntityType,
  CustomFieldType,
} from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { SubSink } from "subsink";

@Component({
  selector: "app-add-update-custom-field-modal",
  templateUrl: "./add-update-custom-field-modal.component.html",
  styleUrls: ["./add-update-custom-field-modal.component.scss"],
})
export class AddUpdateCustomFieldModalComponent implements OnInit, OnDestroy {
  @Input() customFieldEditModel: CustomFieldDto;
  selectedEntityType$: Observable<CustomFieldEntityType>;
  fieldTypes: CustomFieldType[];
  customFieldDefinationFormGroup: FormGroup;
  title: string;
  private _subs = new SubSink();
  selectedFieldTypeId: number = -1;
  maxFieldsAllowed = 0;
  constructor(
    private _fb: FormBuilder,
    private _customFieldsFacade: CustomFieldsFacade,
    private _activeModal: NgbActiveModal
  ) {
    this.selectedEntityType$ = _customFieldsFacade.selectedEntityType$;
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

  onFieldTypeSelectionChanged(): void {
    setTimeout(() => {
      const __formFieldTypeVal = this.customFieldDefinationFormGroup.get(
        "fieldTypeId"
      ).value as number;

      const __fieldType = this.fieldTypes.filter(
        (x) => x.customTypeFieldId === +__formFieldTypeVal
      );
      this.selectedFieldTypeId =
        __fieldType.length > 0 ? __fieldType[0].fieldType : -1;
    }, 10);
  }

  private _initCustomFieldFormGroup(
    customFieldEntityType: CustomFieldEntityType
  ) {
    const _addModal = this.customFieldEditModel === null;
    const _d = this.customFieldEditModel;
    this.customFieldDefinationFormGroup = this._fb.group({
      definationId: [_addModal ? 0 : _d.definationId],
      appliesToCustomTypeId: [customFieldEntityType.entityId],
      label: [
        _addModal ? "" : _d.label,
        [Validators.required, Validators.maxLength(100)],
      ],
      isRequired: [_addModal ? false : _d.isRequired],
      isTransferable: [false],
      defaultValue: [
        _addModal ? null : _d.defaultValue,
        [Validators.maxLength(500)],
      ],
      defaultValue2: [
        _addModal ? null : _d.defaultValue2,
        [Validators.maxLength(500)],
      ],
      valueType: [_addModal ? null : _d.valueType, [Validators.maxLength(50)]],
      fieldTypeId: [_addModal ? null : _d.customFieldTypeId],
      displayOrder: [0],
    });
    if (!_addModal) {
      this.onFieldTypeSelectionChanged();
    }
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  ngOnInit(): void {
    this._subs.add(
      this._customFieldsFacade.fieldTypes$.subscribe((fieldTypesList) => {
        this.fieldTypes = fieldTypesList;
      }),
      this.selectedEntityType$.subscribe((entityType) => {
        if (entityType) {
          this._initCustomFieldFormGroup(entityType);
          this.title = `Add custom field for ${entityType.entityName}`;
          this.maxFieldsAllowed = entityType.maxFieldsAllowed;
        }
      })
    );
  }
}
