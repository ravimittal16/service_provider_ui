import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomFieldsFacade } from "@core-data/index";
import { NgbAccordion } from "@ng-bootstrap/ng-bootstrap";
import { ErrorRenderer } from "@shared/helpers/ErrorRenderer";
import {
  CustomFieldDto,
  CustomFieldEntityType,
} from "@shared/service-proxies/service-proxies";
import { ToastService } from "@shared/services/toast.service";
import { Observable } from "rxjs";
import { first, takeUntil } from "rxjs/operators";
import { SubSink } from "subsink";
import { SettingsModalService } from "../settings.modal.service";

@Component({
  selector: "app-custom-fields",
  templateUrl: "./custom-fields.component.html",
  styleUrls: ["./custom-fields.component.scss"],
})
export class CustomFieldsComponent implements OnInit, AfterViewInit {
  customFieldDetailGroup: FormGroup;
  private __errorRenderer = new ErrorRenderer();
  private _subs = new SubSink();
  alertType: "error" | "success" | "warning" = "error";
  errors$: Observable<string[]>;

  disableButton = false;
  entityTypes$: Observable<CustomFieldEntityType[]>;
  selectedEntityType$: Observable<CustomFieldEntityType>;
  isSelectedEntityType = false;
  fields$: Observable<CustomFieldDto[]>;
  hasReachedToMaxLimit = false;
  constructor(
    private _fb: FormBuilder,
    private _customFieldsFacade: CustomFieldsFacade,
    private _settingsModalService: SettingsModalService,
    private _toastService: ToastService
  ) {
    this.errors$ = this.__errorRenderer.errors$;
    this.entityTypes$ = _customFieldsFacade.entityTypes$;
    this.selectedEntityType$ = _customFieldsFacade.selectedEntityType$;
    this.fields$ = _customFieldsFacade.customFields$;
  }

  ngAfterViewInit(): void {}

  private _initFormControl() {
    this.customFieldDetailGroup = this._fb.group({
      entityType: [null, [Validators.required]],
    });
  }

  onEditButtonClicked(fieldInfo: CustomFieldDto, $event: MouseEvent) {
    const _modalRef = this._settingsModalService.openCustomFieldDefinationModal(
      fieldInfo
    );
    this._subs.add(
      _modalRef.closed.subscribe((result) => {
        if (result) {
          this._toastService.showSuccess(
            "Custom field updated",
            "Custom field has been updated successfully."
          );
        }
      })
    );
  }

  onEntityTypeSelected(): void {
    this.__errorRenderer.clearErrors();
    const _selectedType = this.customFieldDetailGroup.get("entityType").value;
    this.disableButton = _selectedType === null || _selectedType === "";
    this.isSelectedEntityType = !this.disableButton;
    this._customFieldsFacade.setSelectedEntityType(
      _selectedType === null || _selectedType === "" ? null : _selectedType
    );
  }

  addNewCustomTypeClicked(): void {
    const _modalRef = this._settingsModalService.openCustomFieldDefinationModal(
      null
    );
    this._subs.add(
      _modalRef.closed.subscribe((result) => {
        if (result) {
          this._toastService.showSuccess(
            "Custom field created",
            "Custom field has been created successfully"
          );
        }
      })
    );
  }

  private _setSelectedEntityType(type: CustomFieldEntityType): void {
    if (type) {
      const _selectedTypeField = this.customFieldDetailGroup.get("entityType");
      _selectedTypeField.patchValue(type.entityType);
      this.onEntityTypeSelected();
    }
  }

  ngOnInit(): void {
    this._initFormControl();
    this._customFieldsFacade.fetchAllEntityTypesAndFieldTypes();
    this._subs.add(
      this._customFieldsFacade.selectedEntityType$
        .pipe(first())
        .subscribe((selectedType) => {
          this._setSelectedEntityType(selectedType);
        }),

      this._customFieldsFacade.hasReachedToMaxLimit$.subscribe((hasReached) => {
        this.hasReachedToMaxLimit = hasReached;
        if (hasReached) {
          this.alertType = "warning";
          this.__errorRenderer.notifyError(
            "You have reached to the max limit allowed.[NEED TO CHANGE]"
          );
        }
      })
    );
  }
}
