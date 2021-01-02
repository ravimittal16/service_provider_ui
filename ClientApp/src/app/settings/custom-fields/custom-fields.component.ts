import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomFieldsFacade } from "@core-data/index";
import { NgbAccordion } from "@ng-bootstrap/ng-bootstrap";
import { ErrorRenderer } from "@shared/helpers/ErrorRenderer";
import {
  CustomFieldDto,
  CustomFieldEntityType,
} from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";
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
  errors$: Observable<string[]>;
  disableButton = false;
  entityTypes$: Observable<CustomFieldEntityType[]>;
  selectedEntityType$: Observable<CustomFieldEntityType>;
  isSelectedEntityType = false;
  fields$: Observable<CustomFieldDto[]>;
  private _subs = new SubSink();
  constructor(
    private _fb: FormBuilder,
    private _customFieldsFacade: CustomFieldsFacade,
    private _settingsModalService: SettingsModalService
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

  onEntityTypeSelected(): void {
    const _selectedType = this.customFieldDetailGroup.get("entityType").value;
    this.disableButton = _selectedType === null || _selectedType === "";
    this.isSelectedEntityType = !this.disableButton;
    this._customFieldsFacade.setSelectedEntityType(
      _selectedType === null || _selectedType === "" ? null : _selectedType
    );
  }

  addNewCustomTypeClicked(): void {
    const _modalRef = this._settingsModalService.openCustomFieldDefinationModal();
    this._subs.add(
      _modalRef.closed.subscribe((result) => {
        if (result) {
          console.log(result);
        }
      })
    );
  }

  ngOnInit(): void {
    this._initFormControl();
    this._customFieldsFacade.fetchAllEntityTypesAndFieldTypes();
  }
}
