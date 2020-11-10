import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ErrorRenderer } from "@shared/helpers/ErrorRenderer";
import { Guid } from "guid-typescript";
import {
  JobLineItemDto,
  ProductDto,
} from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";

@Component({
  selector: "app-job-items-list-view",
  templateUrl: "./job-items-list-view.component.html",
  styleUrls: ["./job-items-list-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobItemsListViewComponent implements OnInit, OnDestroy {
  @Input() jobId: number;
  @Input() initialItems: JobLineItemDto[];
  lineItems: JobLineItemDto[] = [];
  lineItemsFormGroup: FormGroup;
  private __errorRenderer = new ErrorRenderer();
  errors$: Observable<string[]>;
  constructor(private _fb: FormBuilder, private _cdr: ChangeDetectorRef) {
    this.errors$ = this.__errorRenderer.errors$;
  }
  ngOnDestroy(): void {}

  private _addGroup(item?: JobLineItemDto, i: number = 0) {
    console.log(item?.product?.name);
    const __group = this._fb.group({
      id: [i],
      itemId: [item?.itemId || 0],
      productId: [item?.productId],
      product: [item?.product, [Validators.required]],
      taxable: [item?.taxable || false],
      quantity: [item?.quantity, [Validators.required]],
      price: [item?.price, [Validators.required]],
      markup: [item?.markup],
      description: [item?.description],
    });
    this.controlsArray.push(__group);
  }

  private _pushItemsToFormArray() {
    if (this.initialItems && this.initialItems.length > 0) {
      for (let i = 0; i < this.initialItems.length; i++) {
        const __item = this.initialItems[i];
        this._addGroup(__item, i);
      }
    }
  }

  onItemSelectionChanged(product: ProductDto, index: number) {
    const _formGroup = this.controlsArray.controls[index] as FormGroup;
    _formGroup.get("quantity").patchValue(1);
    _formGroup.get("price").patchValue(product.unitPrice);
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
    }
  }

  ngOnInit(): void {
    this._initFormControl();
    if (this.initialItems) {
      this.lineItems.push(...this.initialItems);
      this._pushItemsToFormArray();
    }
  }
}
