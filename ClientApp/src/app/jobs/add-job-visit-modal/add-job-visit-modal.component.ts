import { Component, Input, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsersFacade } from "@core-data/users-store/users.facade";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
  JobDetailsDto,
  TeamDto,
} from "@shared/service-proxies/service-proxies";

import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-add-job-visit-modal",
  templateUrl: "./add-job-visit-modal.component.html",
  styleUrls: ["./add-job-visit-modal.component.scss"],
})
export class AddJobVisitModalComponent implements OnInit {
  @Input() job: JobDetailsDto;
  newVistFormGroup: FormGroup;
  validationMessages: { [key: string]: string } = {};
  teams$: Observable<TeamDto[]>;
  constructor(
    public activeModal: NgbActiveModal,
    private _fb: FormBuilder,
    private _usersFacade: UsersFacade
  ) {
    this.teams$ = this._usersFacade.teams$.pipe(
      tap((data) => {
        console.log(data);
      })
    );
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
  }

  get visitItemsFormArray(): FormArray {
    return this.newVistFormGroup.get("visitItems") as FormArray;
  }

  onSubmitButtonClicked(): void {
    console.log(this.newVistFormGroup.getRawValue());
  }

  onCancelClicked() {
    const __dirty = this.newVistFormGroup.dirty;
    this.activeModal.close();
  }

  ngOnInit(): void {
    this._initNewVisitForm();
  }
}
