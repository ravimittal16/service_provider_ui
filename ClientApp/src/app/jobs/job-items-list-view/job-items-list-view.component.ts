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
import { JobActionListenerSchema } from "@core-data/jobs-store/jobs.state";

@Component({
  selector: "app-job-items-list-view",
  templateUrl: "./job-items-list-view.component.html",
  styleUrls: ["./job-items-list-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobItemsListViewComponent implements OnInit, OnDestroy {
  @Input() jobId: number;
  @Output() onItemAddCompleted: EventEmitter<{
    totalItems: number;
  }> = new EventEmitter<{ totalItems: number }>();
  @Input() watchJobItems: boolean = false;
  lineItems$: Observable<JobLineItemDto[]>;
  lineItemsFormGroup: FormGroup;
  errors$: Observable<string[]>;
  actionListener$: Observable<JobActionListenerSchema>;
  private __errorRenderer = new ErrorRenderer();
  private __formArrayRendered: boolean = false;
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
      title: [item?.product?.name],
      itemId: [item?.itemId || 0],
      productId: [item?.productId],
      product: [item?.product, [Validators.required]],
      taxable: [item?.taxable || false],
      quantity: [item?.quantity, [Validators.required]],
      price: [item?.price, [Validators.required]],
      markup: [item?.markup],
      description: [item?.description],
      isServiceType: [item?.product?.isServiceType],
      isInEditMode: [false],
    });
    this.controlsArray.push(__group);
  }

  updateQuantity(formIndex: number, quantity: number) {
    const __formGroup = this.controlsArray.controls[formIndex] as FormGroup;
    if (__formGroup) {
      const __quantity = __formGroup.get("quantity");
      const __currentVal = ((__quantity.value || 0) as number) + quantity;
      if (__currentVal >= 0) {
        __quantity.patchValue(__currentVal);
      }
    }
  }

  isInEditMode(formIndex: number) {
    const __formGroup = this.controlsArray.controls[formIndex] as FormGroup;
    if (__formGroup) {
      return __formGroup.get("isInEditMode").value as boolean;
    }
  }

  onRowClicked(formIndex: number, event: any) {
    const __formGroup = this.controlsArray.controls[formIndex] as FormGroup;
    if (__formGroup) {
      const __isInEditMode = __formGroup.get("isInEditMode").value as boolean;
      __formGroup.get("isInEditMode").patchValue(!__isInEditMode);
    }

    event.stopPropagation();
  }

  getRowTotal(formIndex: number) {
    const __formGroup = this.controlsArray.controls[formIndex] as FormGroup;
    if (__formGroup) {
      const __quantity = __formGroup.get("quantity").value;
      const __price = __formGroup.get("price").value;
      return (__price || 0) * (__quantity || 0);
    }
    return "0";
  }

  private __pushItemsToFormArray(items: JobLineItemDto[]) {
    if (items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        const __item = items[i];
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

  deleteItem(
    $event: any,
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
          this._jobFacade.deleteItem(_itemId, this.jobId);
        }
      }
    }
    $event.stopPropagation();
  }

  ngOnDestroy(): void {
    this.__sub.unsubscribe();
  }

  ngOnInit(): void {
    this._initFormControl();
    this.__sub.add(
      this._jobFacade.jobLineItems$
        .pipe(
          tap((items: JobLineItemDto[]) => {
            if (!this.__formArrayRendered) {
              this.__pushItemsToFormArray(items);
              this.__formArrayRendered = true;
            }
            this.onItemAddCompleted.emit({ totalItems: items.length });
          })
        )
        .subscribe()
    );
    this.__listenEvents();
  }

  private __clearItemFromFromArray(itemId: number) {
    const __form = this.controlsArray.controls.filter(
      (x) => x.get("itemId").value === itemId
    );
    if (__form) {
      const __index = this.controlsArray.controls.indexOf(__form[0]);
      setTimeout(() => {
        this.controlsArray.removeAt(__index);
        this._cdr.detectChanges();
      }, 100);
    }
  }

  productName(index: number): any {
    const __formGroup = this.controlsArray.controls[index] as FormGroup;
    if (__formGroup) {
      return __formGroup.get("title").value;
    }
    return "";
  }

  private __listenEvents() {
    this.__sub.add(
      this._jobFacade.actionListener$.subscribe((listenerPayload) => {
        if (listenerPayload !== null) {
          if (listenerPayload.actionType === "Delete Item") {
            this.__clearItemFromFromArray(listenerPayload.itemId);
          }
          this._jobFacade.clearEventData();
        }
      })
    );
  }
}
