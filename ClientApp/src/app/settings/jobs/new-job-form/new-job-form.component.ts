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
import { AppConsts } from "@shared/AppConsts";
import { ErrorRenderer } from "@shared/helpers/ErrorRenderer";
import {
  GenericValidator,
  ValidationTypes,
} from "@shared/helpers/GenericValidator";
import {
  JobFormDefinationDto,
  JobFormModel,
} from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";
import { withLatestFrom } from "rxjs/operators";
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

  private __initForm() {
    this.jobFormGroup = this._fb.group({
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

  addNewField(fieldType: string = "", sectionIndex: number) {
    const __sectionFormGroup = this.getSectionsFormArray.controls[
      sectionIndex
    ] as FormGroup;

    if (__sectionFormGroup) {
      const __fieldsArray = __sectionFormGroup.get("fields") as FormArray;
      const __fieldTypeNum = AppConsts.JobFormFieldTypes[fieldType];
      const __defaultValues =
        fieldType === "choose" ? "Option 1,Option 2" : null;
      const __fieldGroup = this._fb.group({
        fieldId: [0],
        fieldType: [__fieldTypeNum],
        fieldTypeName: [fieldType],
        fieldQuestion: ["", [Validators.maxLength(200)]],
        fieldAnswer: [""],
        isRequired: [false],
        displayOrder: [0],
        defaultValues: [__defaultValues],
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
    if (this.getSectionsFormArray.controls.length <= this.MAX_SECTION_ALLOWED) {
      const _newSection = this._fb.group({
        formSectionId: [0],
        displayOrder: [0],
        sectionName: ["", [Validators.required, Validators.maxLength(200)]],
        fields: this._fb.array([]),
      });
      this.getSectionsFormArray.push(_newSection);
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

  ngOnInit(): void {
    this.__initForm();
    this._jobFormsFacade.fetchJobFormDetails();
    this._subs.add(
      this._jobFormsFacade.formDetails$.subscribe((details) => {
        this.isForNewForm = details === null;
        this.currentEditedDefination = details;
      }),
      this._jobFormsFacade.errors$.subscribe((errors) => {
        this.__errorHandler.notifyError(errors);
      })
    );
  }
}
