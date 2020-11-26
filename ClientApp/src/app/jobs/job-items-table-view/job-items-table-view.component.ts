import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UiComponentsService } from "@app/shared-ui-components/ui.components.service";
import { JobsFacade } from "@core-data/jobs-store/jobs.facade";
import {
  JobLineItemDto,
  ProductDto,
} from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";
import { SubSink } from "subsink";
import { JobsDataService } from "../jobs.data.service";

@Component({
  selector: "app-job-items-table-view",
  templateUrl: "./job-items-table-view.component.html",
  styleUrls: ["./job-items-table-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobItemsTableViewComponent implements OnInit {
  @Input() jobId: number;
  @Input() visitId: number;
  @Input() parentFormGroup: FormGroup;
  @Input() formArrayName: string;
  errors$: Observable<string[]>;
  items: JobLineItemDto[] = [];
  constructor(
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _uiComponentsService: UiComponentsService
  ) {}

  get controlsArray(): FormArray {
    return this.parentFormGroup.get(this.formArrayName) as FormArray;
  }

  productName(index: number): any {
    const __formGroup = this.controlsArray.controls[index] as FormGroup;
    if (__formGroup) {
      return __formGroup.get("title").value;
    }
    return "";
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

  private _addProductToForm(product: ProductDto): void {
    if (this.controlsArray) {
      this.controlsArray.push(
        this._fb.group({
          title: [product.name],
          description: [product.description],
          quantity: [product.quantity, [Validators.required]],
          price: [product.unitPrice, [Validators.required]],
          product: [product],
          productId: [product.productId],
          itemId: [0],
          displayOrder: [0],
        })
      );
      this._cdr.detectChanges();
    }
  }

  deleteItem(formIndex: number, finalConfirmation: boolean): void {
    const __formGroup = this.controlsArray.controls[formIndex] as FormGroup;
    if (__formGroup) {
      this.controlsArray.removeAt(formIndex);
      this._cdr.detectChanges();
    }
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

  addLineItemClicked(fromTable: boolean): void {
    if (fromTable) {
    } else {
      this._uiComponentsService.openProductSelectorModal(
        true,
        "Add product to visit",
        (product: ProductDto) => this._addProductToForm(product)
      );
    }
  }
  ngOnInit(): void {}
}
