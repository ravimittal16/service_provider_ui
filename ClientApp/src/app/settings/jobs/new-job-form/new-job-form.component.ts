import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { JobFormsFacade } from "@core-data/job-forms-store/job.forms.facade";
import { AppConsts, FieldTypes } from "@shared/AppConsts";
import { ErrorRenderer } from "@shared/helpers/ErrorRenderer";
import {
  GenericValidator,
  ValidationTypes,
} from "@shared/helpers/GenericValidator";
import {
  Field,
  JobFormDefinationDto,
  JobFormModel,
  Section,
} from "@shared/service-proxies/service-proxies";

import { Observable } from "rxjs";
import { takeLast, withLatestFrom, take, first } from "rxjs/operators";
import { SubSink } from "subsink";

@Component({
  selector: "app-new-job-form",
  templateUrl: "./new-job-form.component.html",
  styleUrls: ["./new-job-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewJobFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("formNameInput", { static: true }) formNameInput: ElementRef;
  private __formId: string;
  private _subs = new SubSink();

  private __errorHandler = new ErrorRenderer();
  private __validator = new GenericValidator();
  errors$: Observable<string[]>;
  isBusy$: Observable<boolean>;

  validationMessages: { [key: string]: string } = {};
  sectionValidationErrors: {
    [index: number]: { [key: string]: string };
  } = [];
  currentEditedDefination: JobFormModel;
  readonly MAX_SECTION_ALLOWED = 5;
  isForNewForm = false;
  jobFormGroup: FormGroup;
  fieldIndexes: any = [];
  constructor(
    private _router: Router,
    private _jobFormsFacade: JobFormsFacade,
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef
  ) {
    this.errors$ = this.__errorHandler.errors$;
    this.isBusy$ = this._jobFormsFacade.isBusy$;
  }

  get formId(): number {
    const formIdField = this.jobFormGroup.get("formId");
    return formIdField.value;
  }

  private __initForm() {
    this.jobFormGroup = this._fb.group({
      formId: [0],
      formName: ["", [Validators.required, Validators.maxLength(200)]],
      autoAddToNewJobs: [false],
      sections: this._fb.array([]),
      allowMultipleVersions: [false],
    });
    this.__validator.initilizeFormValitorMessages({
      formName: {
        fieldName: "Job Form name",
        validationProps: [
          { validatorType: ValidationTypes.Required },
          { validatorType: ValidationTypes.MaxLength, withValue: 200 },
        ],
      },
      sectionName: {
        fieldName: "Section name",
        validationProps: [
          { validatorType: ValidationTypes.Required },
          { validatorType: ValidationTypes.MaxLength, withValue: 200 },
        ],
      },
    });
  }

  backToJobForms(): void {
    this._router.navigate(["app/settings/jobs/forms"]);
  }

  getFieldsFormArray(index: number): FormArray {
    const __sectionFormGroup = this.getSectionsFormArray.controls[
      index
    ] as FormGroup;
    return __sectionFormGroup.get("fields") as FormArray;
  }

  getFieldType(sectionIndex: number, fieldIndex: number) {
    const __sectionFormGroup = this.getSectionsFormArray.controls[
      sectionIndex
    ] as FormGroup;
    const __fieldsArray = __sectionFormGroup.get("fields") as FormArray;
    const __fieldGroup = __fieldsArray.controls[fieldIndex] as FormGroup;
    const __fieldConfig = __fieldGroup.get("fieldTypeName");
    return __fieldConfig.value;
  }

  addNewField(fieldType: string = "", sectionIndex: number, field?: Field) {
    const __sectionFormGroup = this.getSectionsFormArray.controls[
      sectionIndex
    ] as FormGroup;

    if (__sectionFormGroup) {
      const __fieldsArray = __sectionFormGroup.get("fields") as FormArray;
      const __fieldTypeNum = AppConsts.JobFormFieldTypes[fieldType];
      const __defaultValues =
        fieldType === "choose" ? "Option 1,Option 2" : null;
      const __fieldGroup = this._fb.group({
        fieldId: [field?.fieldId || 0],
        fieldType: [__fieldTypeNum],
        fieldTypeName: [fieldType],
        fieldQuestion: [
          field?.fieldQuestion || "",
          [Validators.maxLength(200)],
        ],
        fieldAnswer: [""],
        isRequired: [field?.isRequired || false],
        displayOrder: [field?.displayOrder || 0],
        defaultValue: [""],
        valueSource: [__defaultValues],
      });
      this.fieldIndexes.push({
        type: fieldType,
        sectionIndex: sectionIndex,
        fieldIndex: __fieldsArray.length,
      });
      __fieldsArray.push(__fieldGroup);
    }
  }

  deleteFieldClicked(fieldIndex: number, sectionIndex: number): void {
    const __sectionFormGroup = this.getSectionsFormArray.controls[
      sectionIndex
    ] as FormGroup;
    const __fieldsArray = __sectionFormGroup.get("fields") as FormArray;
    const __fieldGroup = __fieldsArray.controls[fieldIndex] as FormGroup;
    if (__fieldGroup) {
      const __fieldId = +__fieldGroup.get("fieldId").value;
      if (__fieldId === 0) {
        __fieldsArray.removeAt(fieldIndex);
        this._cdr.detectChanges();
      }
    }
  }

  onSaveButtonClicked(): void {
    this.__errorHandler.clearErrors();
    if (this.jobFormGroup.valid) {
      const __model = this.jobFormGroup.getRawValue();
      this._jobFormsFacade.createjobForm(__model as JobFormModel);
    } else {
      this.validationMessages = this.__validator.processMessages(
        this.jobFormGroup
      );
      this.sectionValidationErrors = this.__validator.processValidationOnFormArray(
        this.getSectionsFormArray
      );
      this._cdr.detectChanges();
    }
  }

  deleteSection(sectionIndex: number) {}

  onCancelButtonClicked(): void {}

  addNewFormSectionClicked(): void {
    this.__addNewSectionFormGroup(null);
  }

  private __addNewSectionFormGroup(section?: Section): FormGroup {
    const __isSectionDefined = section !== null && section !== undefined;
    if (this.getSectionsFormArray.controls.length <= this.MAX_SECTION_ALLOWED) {
      const _newSection = this._fb.group({
        formSectionId: [__isSectionDefined ? section.formSectionId : 0],
        displayOrder: [__isSectionDefined ? section.displayOrder : 0],
        sectionName: [
          __isSectionDefined ? section.sectionName : "",
          [Validators.required, Validators.maxLength(200)],
        ],
        fields: this._fb.array([]),
      });
      this.getSectionsFormArray.push(_newSection);
      return _newSection;
    }
  }

  get getSectionsFormArray(): FormArray {
    return this.jobFormGroup.get("sections") as FormArray;
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  ngAfterViewInit(): void {
    if (this.formNameInput) {
      this.formNameInput.nativeElement.focus();
    }
  }

  private __patchValues(form: FormGroup, valObj: any): void {
    const __keys = Object.keys(valObj);
    for (let i = 0; i < __keys.length; i++) {
      const __value = valObj[__keys[i]];
      if (typeof __value !== "object") {
        this.jobFormGroup.get(__keys[i]).patchValue(__value);
      }
    }
  }

  getFieldTypeName(keyValue: number) {
    switch (keyValue) {
      case FieldTypes.CHECKBOX:
        return "checkbox";
      case FieldTypes.CHOOSEONE:
        return "date";
      case FieldTypes.DATEPICKER:
        return "shortAnswer";
      case FieldTypes.FILEUPLOAD:
        return "longAnswer";
      case FieldTypes.LONGANSWER:
        return "choose";
      case FieldTypes.SHORTANSWER:
        return "upload";
    }
  }

  private __bindJobFormData() {
    if (this.currentEditedDefination) {
      const _d: JobFormModel = this.currentEditedDefination;
      this.__patchValues(this.jobFormGroup, _d);
      if (_d.sections) {
        for (let i = 0; i < _d.sections.length; i++) {
          const _section = _d.sections[i];
          this.__addNewSectionFormGroup(_section);
          for (let f = 0; f < _section.fields.length; f++) {
            const field = _section.fields[f];
            const __fieldName = this.getFieldTypeName(field.fieldType);
            this.addNewField(__fieldName, i, field);
          }
        }
      }
      this._cdr.detectChanges();
    }
  }

  ngOnInit(): void {
    this.__initForm();
    this._subs.add(
      this._jobFormsFacade.formDetails$.subscribe((details) => {
        this.isForNewForm = details === null;
        if (details !== null) {
          this.currentEditedDefination = details;
          this.__bindJobFormData();
        }
      }),
      this._jobFormsFacade.errors$.subscribe((errors) => {
        this.__errorHandler.notifyError(errors);
      })
    );
    this._jobFormsFacade.fetchJobFormDetails(0);
  }
}
