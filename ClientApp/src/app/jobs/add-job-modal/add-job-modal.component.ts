import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ErrorRenderer } from "@shared/helpers/ErrorRenderer";
import { Observable } from "rxjs";
@Component({
  selector: "app-add-job-modal",
  templateUrl: "./add-job-modal.component.html",
  styleUrls: ["./add-job-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddJobModalComponent implements OnInit {
  errors$: Observable<string[]>;
  private __errorHandler = new ErrorRenderer();
  @ViewChild("titleInput") titleInput: ElementRef;
  jobFormGroup: FormGroup;
  scheduleStart: Date;
  constructor(
    public activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder
  ) {
    this.errors$ = this.__errorHandler.errors$;
  }

  onFormSubmitted(editAfterSave: boolean): void {
    const __model = this.jobFormGroup.getRawValue();
    console.log(__model);
  }

  private __buildForm(): void {
    const __now = new Date();
    this.jobFormGroup = this._formBuilder.group({
      title: ["", [Validators.required]],
      jobNumber: [""],
      jobDescription: [""],
      serviceTypeId: [0, [Validators.required]],
      customerId: [0, [Validators.required]],
      assignedTo: [0],
      jobStartDate: [__now],
      jobStartTime: [__now],
      jobEndDate: [__now],
      jobEndTime: [__now],
    });
  }

  getFieldValue(fieldName: string) {
    return this.jobFormGroup.get(fieldName).value;
  }

  onStartDateChanged(newDate: Date) {}

  ngAfterViewInit(): void {
    var _focusElement = this.titleInput;
    setTimeout(() => {
      _focusElement.nativeElement.focus();
    });
  }

  ngOnInit(): void {
    this.__buildForm();
  }
}
