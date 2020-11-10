import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ErrorRenderer } from "@shared/helpers/ErrorRenderer";
import { JobLineItemDto } from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";

@Component({
  selector: "app-job-items-list-view",
  templateUrl: "./job-items-list-view.component.html",
  styleUrls: ["./job-items-list-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobItemsListViewComponent implements OnInit {
  @Input() jobId: number;
  @Input() initialItems: JobLineItemDto[];
  lineItems: JobLineItemDto[] = [];
  lineItemsFormGroup: FormGroup;
  private __errorRenderer = new ErrorRenderer();
  errors$: Observable<string[]>;
  constructor(private _fb: FormBuilder, private _cdr: ChangeDetectorRef) {
    this.errors$ = this.__errorRenderer.errors$;
  }

  private _addGroup(item?: JobLineItemDto, i: number = 0) {
    const __group = this._fb.group({
      id: [i],
      itemId: [item?.itemId || 0],
      productId: [item?.productId],
      productName: [item?.product?.name, [Validators.required]],
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

  get controlsArray(): FormArray {
    return this.lineItemsFormGroup.get("lineItems") as FormArray;
  }

  private _initFormControl() {
    this.lineItemsFormGroup = this._fb.group({
      lineItems: this._fb.array([]),
    });
  }

  addLineItemClicked(fromTable: boolean): void {
    this._addGroup();
  }

  ngOnInit(): void {
    this._initFormControl();
    if (this.initialItems) {
      this.lineItems.push(...this.initialItems);
      this._pushItemsToFormArray();
    }
  }
}
