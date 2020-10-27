import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductsFacade } from "@core-data/products-store/products.facade";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ErrorRenderer } from "@shared/helpers/ErrorRenderer";
import {
  GenericValidator,
  ValidationTypes,
} from "@shared/helpers/GenericValidator";
import { ProductDto } from "@shared/service-proxies/service-proxies";

import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { SubSink } from "subsink";
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
  validationMessages: { [key: string]: string } = {};
  private _subs = new SubSink();
  private __validator = new GenericValidator();
  servicesOnly$: Observable<ProductDto[]>;
  constructor(
    public activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _productFacade: ProductsFacade
  ) {
    this.errors$ = this.__errorHandler.errors$;
  }

  onFormSubmitted(editAfterSave: boolean): void {
    const __model = this.jobFormGroup.getRawValue();
    this.validationMessages = {};
    if (this.jobFormGroup.invalid) {
      this.validationMessages = this.__validator.processMessages(
        this.jobFormGroup
      );
      console.log(this.validationMessages);
      this._cdr.detectChanges();
    } else {
    }
  }

  private __buildForm(): void {
    const __now = new Date();
    this.jobFormGroup = this._formBuilder.group({
      jobTitle: ["", [Validators.required]],
      jobNumber: [""],
      jobDescription: ["", [Validators.maxLength(1000)]],
      serviceTypeId: [null, [Validators.required]],
      customerId: [null, [Validators.required]],
      assignedTo: [0],
      jobStartDate: [__now],
      jobStartTime: [__now],
      jobEndDate: [null],
      jobEndTime: [null],
      internalNotes: [],
    });
    this.__validator.initilizeFormValitorMessages({
      jobTitle: {
        fieldName: "Job Title",
        validationProps: [
          { validatorType: ValidationTypes.Required },
          { validatorType: ValidationTypes.MaxLength, withValue: 100 },
        ],
      },
      serviceTypeId: {
        fieldName: "Service Type",
        validationProps: [{ validatorType: ValidationTypes.Required }],
      },
      customerId: {
        fieldName: "Customer",
        validationProps: [{ validatorType: ValidationTypes.Required }],
      },
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
    this.servicesOnly$ = this._productFacade.servicesOnly$.pipe(
      tap((x) => console.log(x))
    );
  }
}
