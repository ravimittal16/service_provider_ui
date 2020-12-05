import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { JobFormsFacade } from "@core-data/job-forms-store/job.forms.facade";
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
import { SubSink } from "subsink";

@Component({
  selector: "app-new-job-form",
  templateUrl: "./new-job-form.component.html",
  styleUrls: ["./new-job-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewJobFormComponent implements OnInit, AfterViewInit {
  @ViewChild("formNameInput", { static: true }) formNameInput: ElementRef;
  private __formId: string;
  private _subs = new SubSink();
  private __definations: JobFormDefinationDto[];
  private __errorHandler = new ErrorRenderer();
  private __validator = new GenericValidator();
  errors$: Observable<string[]>;
  validationMessages: { [key: string]: string } = {};
  sectionValidationErrors: {
    [index: number]: { [key: string]: string };
  } = [];
  currentEditedDefination: JobFormDefinationDto;

  isForNewForm = false;
  jobFormGroup: FormGroup;
  fieldIndexes: any = [];
  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private _jobFormsFacade: JobFormsFacade,
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef
  ) {
    this.errors$ = this.__errorHandler.errors$;
  }

  private __initForm() {
    this.jobFormGroup = this._fb.group({
      formName: ["", [Validators.required, Validators.maxLength(200)]],
      autoAddToNewJobs: [false],
      sections: this._fb.array([]),
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
    const __sectionsArray = this.jobFormGroup.get("sections") as FormArray;
    const __sectionFormGroup = __sectionsArray.controls[index] as FormGroup;
    return __sectionFormGroup.get("fields") as FormArray;
  }

  getFieldType(sectionIndex: number, fieldIndex: number) {
    const __sectionsArray = this.jobFormGroup.get("sections") as FormArray;
    const __sectionFormGroup = __sectionsArray.controls[
      sectionIndex
    ] as FormGroup;
    const __fieldsArray = __sectionFormGroup.get("fields") as FormArray;
    const __fieldGroup = __fieldsArray.controls[fieldIndex] as FormGroup;
    const __fieldConfig = __fieldGroup.get("fieldTypeName");
    return __fieldConfig.value;
  }

  addNewField(fieldType: "", sectionIndex: number) {
    const __sectionsArray = this.jobFormGroup.get("sections") as FormArray;
    const __sectionFormGroup = __sectionsArray.controls[
      sectionIndex
    ] as FormGroup;

    if (__sectionFormGroup) {
      const __fieldsArray = __sectionFormGroup.get("fields") as FormArray;
      const __fieldGroup = this._fb.group({
        fieldType: [0],
        fieldTypeName: [fieldType],
        fieldQuestion: ["", [Validators.maxLength(200)]],
        fieldAnswer: [""],
        isRequired: [false],
        displayOrder: [0],
        defaultValues: ["Option 1,Option 2"],
      });
      this.fieldIndexes.push({
        type: fieldType,
        sectionIndex: sectionIndex,
        fieldIndex: __fieldsArray.length,
      });
      __fieldsArray.push(__fieldGroup);
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
      const __formArray = this.jobFormGroup.get("sections") as FormArray;
      this.sectionValidationErrors = this.__validator.processValidationOnFormArray(
        __formArray
      );
      this._cdr.detectChanges();
    }
  }

  onCancelButtonClicked(): void {}

  addNewFormSectionClicked(): void {
    const __sectionsArray = this.jobFormGroup.get("sections") as FormArray;
    const _newSection = this._fb.group({
      formSectionId: [0],
      displayOrder: [0],
      sectionName: ["", [Validators.required, Validators.maxLength(200)]],
      fields: this._fb.array([]),
    });
    __sectionsArray.push(_newSection);
  }

  get getSectionsFormArray(): FormArray {
    return this.jobFormGroup.get("sections") as FormArray;
  }

  ngAfterViewInit(): void {
    if (this.formNameInput) {
      this.formNameInput.nativeElement.focus();
    }
  }

  ngOnInit(): void {
    this.__initForm();
    this.__formId = this.route.snapshot.queryParamMap.get("__formId");
    this.isForNewForm = this.__formId === null;
    this._subs.add(
      this._jobFormsFacade.formDefinations$.subscribe((definations) => {
        this.__definations = definations;
        if (this.__formId) {
          this.currentEditedDefination = this.__definations.find(
            (x) => x.formId === +this.__formId
          );
        }
      })
    );
    this._subs.add(
      this._jobFormsFacade.errors$.subscribe((errors) => {
        this.__errorHandler.notifyError(errors);
      })
    );
  }
}
