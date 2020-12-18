import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { JobsFacade, JobFormsFacade } from "@core-data/index";

import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { JobFormDataDetailSingle } from "@shared/service-proxies/service-proxies";
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

  private _isSavedChanges = false;
  private _subs = new SubSink();

  selectedJobFormDetails$: Observable<JobFormDataDetailSingle>;
  constructor(
    private activeModal: NgbActiveModal,
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _jobFacade: JobsFacade,
    private _jobFormFacade: JobFormsFacade
  ) {
    this.selectedJobFormDetails$ = this._jobFormFacade.selectedJobFormDataDetails$;
  }

  onCloseButtonClicked() {
    this.activeModal.close(this._isSavedChanges);
  }

  onSaveChangesClicked() {}

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  ngOnInit(): void {
    this._jobFormFacade.fetchJobFormDataDetails(
      this.jobId,
      this.formId,
      this.recordId || 0
    );
    this._subs.add(
      this.selectedJobFormDetails$.subscribe((details) => {
        console.log(details);
      })
    );
  }
}
