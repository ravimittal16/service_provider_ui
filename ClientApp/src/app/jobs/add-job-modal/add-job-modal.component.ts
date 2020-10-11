import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
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
  jobFormGroup: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder
  ) {
    this.errors$ = this.__errorHandler.errors$;
  }

  onFormSubmitted(): void {}

  private __buildForm(): void {
    this.jobFormGroup = this._formBuilder.group({
      title: ["", [Validators.required]],
      jobNumber: [""],
    });
  }

  ngOnInit(): void {
    this.__buildForm();
  }
}
