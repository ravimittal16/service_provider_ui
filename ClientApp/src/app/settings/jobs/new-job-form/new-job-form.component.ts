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
import { ActivatedRoute } from "@angular/router";
import { JobFormsFacade } from "@core-data/job-forms-store/job.forms.facade";
import { JobFormDefinationDto } from "@shared/service-proxies/service-proxies";
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
  currentEditedDefination: JobFormDefinationDto;

  isForNewForm = false;
  jobFormGroup: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private _jobFormsFacade: JobFormsFacade,
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef
  ) {}

  private __initForm() {
    this.jobFormGroup = this._fb.group({
      formName: ["", [Validators.required, Validators.maxLength(200)]],
      autoAddToNewJobs: [false],
      sections: this._fb.array([]),
    });
  }

  addNewField(fieldType: "", sectionIndex: number) {
    const __sectionsArray = this.jobFormGroup.get("sections") as FormArray;
    const __sectionFormGroup = __sectionsArray.controls[
      sectionIndex
    ] as FormGroup;
    console.log(__sectionFormGroup.getRawValue());
  }

  addNewFormSectionClicked(): void {
    const __sectionsArray = this.jobFormGroup.get("sections") as FormArray;
    const _newSection = this._fb.group({
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
  }
}
