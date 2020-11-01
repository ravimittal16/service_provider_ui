import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomerSelectorInputComponent } from "@app/shared-ui-components/customer-selector-input/customer-selector-input.component";
import { CustomersFacade } from "@core-data/customers/customers.facade";
import { ProductsFacade } from "@core-data/products-store/products.facade";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ErrorRenderer } from "@shared/helpers/ErrorRenderer";
import {
  GenericValidator,
  ValidationTypes,
} from "@shared/helpers/GenericValidator";
import {
  CreateJobModel,
  CustomerDto,
  ProductDto,
} from "@shared/service-proxies/service-proxies";

import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

import { SubSink } from "subsink";
import { JobsDataService } from "../jobs.data.service";
@Component({
  selector: "app-add-job-modal",
  templateUrl: "./add-job-modal.component.html",
  styleUrls: ["./add-job-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddJobModalComponent implements OnInit, OnDestroy {
  @ViewChild("customerSelector")
  customerSelector: CustomerSelectorInputComponent;
  errors$: Observable<string[]>;
  jobFormGroup: FormGroup;
  scheduleStart: Date;
  validationMessages: { [key: string]: string } = {};
  servicesOnly$: Observable<ProductDto[]>;
  activeCustomers: CustomerDto[];
  selectedJobColor: string = "#1e62c9";
  isBusy = false;
  private __errorHandler = new ErrorRenderer();
  private __subs = new SubSink();
  private __validator = new GenericValidator();
  constructor(
    public activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _jobsDataService: JobsDataService,
    private _productFacade: ProductsFacade,
    private _customerFacade: CustomersFacade
  ) {
    this.errors$ = this.__errorHandler.errors$;
  }

  onFormSubmitted(editAfterSave: boolean): void {
    const __model = this.jobFormGroup.getRawValue() as CreateJobModel;
    __model.jobColor = this.selectedJobColor;
    this.validationMessages = {};
    if (this.jobFormGroup.invalid) {
      this.validationMessages = this.__validator.processMessages(
        this.jobFormGroup
      );
      this._cdr.detectChanges();
    } else {
      this.isBusy = true;
      this._jobsDataService
        .createJob(__model)
        .pipe(
          finalize(() => {
            this.isBusy = false;
            this._cdr.detectChanges();
          })
        )
        .subscribe((response) => {
          if (response.isSuccess) {
            if (editAfterSave) {
              //TODO : Redirect to Edit Job Page
            }
          } else {
            if (response.errors && response.errors.length > 0) {
              this.__errorHandler.notifyError(response.errors);
            } else {
              this.__errorHandler.notifyError(
                this.__errorHandler.genericErrors.generalError
              );
            }
          }
        });
    }
  }

  onCustomerSelectionChanged(customer: CustomerDto): void {
    console.log(customer);
    //TODO: Show Address Selection Modal
  }

  onServiceTypeChanged(product: ProductDto): void {}

  onScheduleLaterCheckChange(): void {
    const __scheduleLater = this.jobFormGroup.get("scheduleLater")
      .value as boolean;
    this.jobFormGroup.get("startDate").enable();
    this.jobFormGroup.get("startTime").enable();
    this.jobFormGroup.get("endDate").enable();
    this.jobFormGroup.get("endTime").enable();
    if (__scheduleLater) {
      this.jobFormGroup.get("startDate").disable();
      this.jobFormGroup.get("startTime").disable();
      this.jobFormGroup.get("endDate").disable();
      this.jobFormGroup.get("endTime").disable();
    }
  }

  private __buildForm(): void {
    const __now = new Date();
    this.jobFormGroup = this._formBuilder.group({
      jobTitle: ["", [Validators.required]],
      jobNumber: [""],
      jobColor: [""],
      jobDescription: ["", [Validators.maxLength(1000)]],
      serviceType: [null, [Validators.required]],
      customer: [null, [Validators.required]],
      assignedTo: [null],
      scheduleLater: [false],
      startDate: [__now],
      startTime: [__now],
      endDate: [null],
      endTime: [null],
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
      serviceType: {
        fieldName: "Service Type",
        validationProps: [{ validatorType: ValidationTypes.Required }],
      },
      customer: {
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
    if (this.customerSelector) {
      this.customerSelector.setFocus();
    }
  }

  ngOnDestroy(): void {
    this.__subs.unsubscribe();
  }

  ngOnInit(): void {
    this.__buildForm();
    this.servicesOnly$ = this._productFacade.servicesOnly$;
    this.__subs.add(
      this._customerFacade.activeCustomers$.subscribe((x) => {
        if (x) {
          this.activeCustomers = x;
        }
      })
    );
  }
}
