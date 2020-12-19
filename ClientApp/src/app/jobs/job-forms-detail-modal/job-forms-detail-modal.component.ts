import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JobsFacade, JobFormsFacade } from "@core-data/index";

import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
  Field,
  JobFormDataDetailSingle,
} from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";
import { SubSink } from "subsink";

@Component({
  selector: "app-job-forms-detail-modal",
  templateUrl: "./job-forms-detail-modal.component.html",
  styleUrls: ["./job-forms-detail-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobFormsDetailModalComponent implements OnInit, OnDestroy {
  @Input() jobId: number;
  @Input() formId: number;
  @Input() recordId: number;
  title: string = "Job Form Details";
  jobDetailsFormGroup: FormGroup;
  private _isSavedChanges = false;
  private _subs = new SubSink();

  selectedJobFormDetails$: Observable<JobFormDataDetailSingle>;
  constructor(
    private activeModal: NgbActiveModal,
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _jobFormFacade: JobFormsFacade
  ) {
    this.selectedJobFormDetails$ = this._jobFormFacade.selectedJobFormDataDetails$;
  }

  onCloseButtonClicked() {
    this._jobFormFacade.clearJobFormDataStateObject();
    this.activeModal.close(this._isSavedChanges);
  }

  onSaveChangesClicked() {}

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  get sectionsArray(): FormArray {
    return this.jobDetailsFormGroup.get("sections") as FormArray;
  }

  getFieldsFormArray(index: number): FormArray {
    const __sectionFormGroup = this.sectionsArray.controls[index] as FormGroup;
    return __sectionFormGroup.get("fields") as FormArray;
  }

  getSectionName(index: number) {
    const __sectionFormGroup = this.sectionsArray.controls[index] as FormGroup;
    return __sectionFormGroup.get("sectionName").value;
  }

  getFieldProps(sectionIndex: number, fieldIndex: number) {
    const __sectionFormGroup = this.sectionsArray.controls[
      sectionIndex
    ] as FormGroup;
    const _fields = __sectionFormGroup.get("fields") as FormArray;
    return _fields.controls[fieldIndex].get("fieldObject").value as Field;
  }

  private __buildJobFormUI(details: JobFormDataDetailSingle) {
    if (details && details.formModel) {
      const __sections = details.formModel.sections;
      const __sectionFormArray = __sections.map((section) => {
        const __fieldsArray = section.fields.map((field) => {
          const __validators = field.isRequired ? [Validators.required] : [];
          return this._fb.group({
            fieldId: [field.fieldId],
            question: [field.fieldQuestion],
            fieldType: [field.fieldType],
            fieldObject: [field],
            defaultValues: [field.valueSource],
            fieldValue: ["", __validators],
          });
        });
        return this._fb.group({
          sectionName: [section.sectionName],
          sectionId: [section.formSectionId],
          fields: this._fb.array([...__fieldsArray]),
        });
      });
      __sectionFormArray.forEach((__el) => {
        this.sectionsArray.push(__el);
      });
    }
  }

  ngOnInit(): void {
    this.jobDetailsFormGroup = this._fb.group({
      formId: [this.formId],
      jobId: [this.jobId],
      sections: this._fb.array([]),
    });
    this._jobFormFacade.fetchJobFormDataDetails(
      this.jobId,
      this.formId,
      this.recordId || 0
    );
    this._subs.add(
      this.selectedJobFormDetails$.subscribe((details) => {
        if (details !== null) {
          this.title = details.formModel.formName;
          this.__buildJobFormUI(details);
          this._cdr.detectChanges();
        }
      })
    );
  }
}
