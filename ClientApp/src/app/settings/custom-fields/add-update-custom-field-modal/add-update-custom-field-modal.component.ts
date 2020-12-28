import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomFieldsFacade } from "@core-data/index";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomFieldEntityType } from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";
import { SubSink } from "subsink";

@Component({
  selector: "app-add-update-custom-field-modal",
  templateUrl: "./add-update-custom-field-modal.component.html",
  styleUrls: ["./add-update-custom-field-modal.component.scss"],
})
export class AddUpdateCustomFieldModalComponent implements OnInit, OnDestroy {
  selectedEntityType$: Observable<CustomFieldEntityType>;
  customFieldDefinationFormGroup: FormGroup;
  private _subs = new SubSink();
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

  onSaveButtonClicked(): void {}

  private _initCustomFieldFormGroup(
    customFieldEntityType: CustomFieldEntityType
  ) {
    this.customFieldDefinationFormGroup = this._fb.group({
      definationId: [0],
      appliesToCustomTypeId: [customFieldEntityType.entityId],
      label: ["", [Validators.required, Validators.maxLength(100)]],
      isRequired: [false],
      isTransferable: [false],
      defaultValue: [null],
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
        }
      }),
      this._customFieldsFacade.fieldTypes$.subscribe((fieldTypes) => {
        console.log(fieldTypes);
      })
    );
  }
}
