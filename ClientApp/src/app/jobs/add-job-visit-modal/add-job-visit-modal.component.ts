import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsersFacade } from "@core-data/users-store/users.facade";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
  JobDetailsDto,
  TeamDto,
} from "@shared/service-proxies/service-proxies";
import {
  GenericValidator,
  ValidationTypes,
} from "@shared/helpers/GenericValidator";
import { Observable } from "rxjs";
import { finalize, tap } from "rxjs/operators";
import { JobsDataService } from "../jobs.data.service";
import { ErrorRenderer } from "@shared/helpers/ErrorRenderer";
import { SubSink } from "subsink";
import { ToastService } from "@shared/services/toast.service";

@Component({
  selector: "app-add-job-visit-modal",
  templateUrl: "./add-job-visit-modal.component.html",
  styleUrls: ["./add-job-visit-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddJobVisitModalComponent implements OnInit {
  @Input() job: JobDetailsDto;
  newVistFormGroup: FormGroup;
  validationMessages: { [key: string]: string } = {};
  teams$: Observable<TeamDto[]>;
  errors$: Observable<string[]>;
  isBusy = false;
  private __errorHandler = new ErrorRenderer();
  private __subs = new SubSink();
  private __validator = new GenericValidator();
  constructor(
    public activeModal: NgbActiveModal,
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _usersFacade: UsersFacade,
    private _jobDataService: JobsDataService,
    private _toastService: ToastService
  ) {
    this.errors$ = this.__errorHandler.errors$;
    this.teams$ = this._usersFacade.teams$;
  }
  onStartDateChanged(newDate: Date) {}
  getFieldValue(fieldName: string) {
    return this.newVistFormGroup.get(fieldName).value;
  }

  onScheduleLaterCheckChange(): void {
    const __scheduleLater = this.newVistFormGroup.get("scheduleLater")
      .value as boolean;
    this.newVistFormGroup.get("startDate").enable();
    this.newVistFormGroup.get("startTime").enable();
    this.newVistFormGroup.get("endDate").enable();
    this.newVistFormGroup.get("endTime").enable();
    if (__scheduleLater) {
      this.newVistFormGroup.get("startDate").disable();
      this.newVistFormGroup.get("startTime").disable();
      this.newVistFormGroup.get("endDate").disable();
      this.newVistFormGroup.get("endTime").disable();
    }
  }

  private _initNewVisitForm() {
    const __defaultTitle = `${this.job?.customer?.displayName} - ${this.job.title}`;
    const __now = new Date();
    this.newVistFormGroup = this._fb.group({
      title: [__defaultTitle, [Validators.required, Validators.maxLength(200)]],
      description: ["", []],
      assignedTo: [null],
      scheduleLater: [false],
      startDate: [__now],
      startTime: [__now],
      endDate: [null],
      jobId: [this.job.jobId],
      endTime: [null],
      visitItems: this._fb.array([]),
    });
    this.__validator.initilizeFormValitorMessages({
      title: {
        fieldName: "Title",
        validationProps: [
          { validatorType: ValidationTypes.Required },
          { validatorType: ValidationTypes.MaxLength, withValue: 200 },
        ],
      },
    });
  }

  get visitItemsFormArray(): FormArray {
    return this.newVistFormGroup.get("visitItems") as FormArray;
  }

  onSubmitButtonClicked(): void {
    const _model = this.newVistFormGroup.getRawValue();
    if (this.newVistFormGroup.invalid) {
      this.validationMessages = this.__validator.processMessages(
        this.newVistFormGroup
      );
      this._cdr.detectChanges();
    } else {
      this.isBusy = true;
      this.__subs.add(
        this._jobDataService
          .addVisitToJob(_model)
          .pipe(finalize(() => {}))
          .subscribe((respnse) => {
            if (respnse.isSuccess) {
              this._toastService.showSuccess(
                "Visit created",
                "Job visit has been created successfully"
              );
            } else {
              this.__errorHandler.notifyError("Error while adding job visit.");
            }
          })
      );
    }
  }

  onCancelClicked() {
    const __dirty = this.newVistFormGroup.dirty;
    this.activeModal.close();
  }

  ngOnInit(): void {
    this._initNewVisitForm();
  }
}
