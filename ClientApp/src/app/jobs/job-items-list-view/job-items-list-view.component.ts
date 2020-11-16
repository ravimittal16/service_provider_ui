import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ErrorRenderer } from "@shared/helpers/ErrorRenderer";
import { Guid } from "guid-typescript";
import {
  JobLineItemDto,
  ProductDto,
} from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";
import { NgbPopover } from "@ng-bootstrap/ng-bootstrap";
import { UiComponentsService } from "@app/shared-ui-components/ui.components.service";
import { JobsDataService } from "../jobs.data.service";
import { SubSink } from "subsink";
import { JobsFacade } from "@core-data/jobs-store/jobs.facade";
import { finalize, tap } from "rxjs/operators";

@Component({
  selector: "app-job-items-list-view",
  templateUrl: "./job-items-list-view.component.html",
  styleUrls: ["./job-items-list-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobItemsListViewComponent implements OnInit, OnDestroy {
  @Input() jobId: number;
  @Input() initialItems: JobLineItemDto[];
  @Output() onItemAddCompleted: EventEmitter<{
    totalItems: number;
  }> = new EventEmitter<{ totalItems: number }>();
  lineItems$: Observable<JobLineItemDto[]>;
  lineItemsFormGroup: FormGroup;
  errors$: Observable<string[]>;
  private __errorRenderer = new ErrorRenderer();
  private __sub = new SubSink();
  constructor(
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _uiComponentsService: UiComponentsService,
    private _jobDataService: JobsDataService,
    private _jobFacade: JobsFacade
  ) {
    this.errors$ = this.__errorRenderer.errors$;
  }

  private _addGroup(item?: JobLineItemDto) {
    const _id = item ? item?.itemId.toString() : Guid.create().toString();

    const __group = this._fb.group({
      id: [_id],
      itemId: [item?.itemId || 0],
      productId: [item?.productId],
      product: [item?.product, [Validators.required]],
      taxable: [item?.taxable || false],
      quantity: [item?.quantity, [Validators.required]],
      price: [item?.price, [Validators.required]],
      markup: [item?.markup],
      description: [item?.description],
      isServiceType: [item?.product?.isServiceType],
    });
    this.controlsArray.push(__group);
  }

  private _pushItemsToFormArray() {
    if (this.initialItems && this.initialItems.length > 0) {
      for (let i = 0; i < this.initialItems.length; i++) {
        const __item = this.initialItems[i];
        this._addGroup(__item);
      }
    }
  }

  private _setFocusToDescription(index: number) {
    const _descriptionEL = document.getElementById(`description${index}`);
    if (_descriptionEL) {
      _descriptionEL.focus();
    }
  }

  onItemSelectionChanged(product: ProductDto, index: number) {
    const _formGroup = this.controlsArray.controls[index] as FormGroup;
    _formGroup.get("quantity").patchValue(1);
    _formGroup.get("price").patchValue(product.unitPrice);
    _formGroup.get("description").patchValue(product.description);
    this._setFocusToDescription(index);
  }

  get controlsArray(): FormArray {
    const _formArray = this.lineItemsFormGroup.get("lineItems") as FormArray;
    return _formArray;
  }

  private _initFormControl() {
    this.lineItemsFormGroup = this._fb.group({
      id: [],
      lineItems: this._fb.array([]),
    });
  }

  addLineItemClicked(fromTable: boolean): void {
    if (fromTable) {
      this._addGroup();
    } else {
      this._uiComponentsService.openProductSelectorModal(
        true,
        "Add Product",
        (product: ProductDto) => {
          this.__sub.add(
            this._jobDataService
              .addProductToJob(this.jobId, product)
              .subscribe((item) => {
                if (item) {
                  this._addGroup(item);
                  this._jobFacade.lineItemAdded(item, this.jobId);
                  this._cdr.detectChanges();
                }
              })
          );
        }
      );
    }
  }

  trackByItemId(index: number, item: JobLineItemDto) {
    return item.itemId;
  }

  deleteItem(
    index: number,
    confirmationPopover: NgbPopover,
    isFinalConfirmation: boolean
  ) {
    const _formGroup = this.controlsArray.controls[index] as FormGroup;
    if (_formGroup) {
      const _itemId = _formGroup.get("itemId").value;
      if (_itemId === 0) {
        this.controlsArray.controls.splice(index, 1);
      } else {
        if (!isFinalConfirmation) {
          confirmationPopover.open();
        } else {
          console.log("Delete");
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.__sub.unsubscribe();
  }

  ngOnInit(): void {
    this.__sub.add(
      this._jobFacade.jobLineItems$
        .pipe(
          tap((items: JobLineItemDto[]) => {
            this.onItemAddCompleted.emit({ totalItems: items.length });
          })
        )
        .subscribe()
    );
    this._initFormControl();
    if (this.initialItems) {
      this._pushItemsToFormArray();
    }
  }
}
