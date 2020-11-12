import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { ProductsFacade } from "@core-data/products-store/products.facade";
import { ProductDto } from "@shared/service-proxies/service-proxies";
import { SubSink } from "subsink";
@Component({
  selector: "app-product-selector-modal",
  templateUrl: "./product-selector-modal.component.html",
  styleUrls: ["./product-selector-modal.component.scss"],
})
export class ProductSelectorModalComponent implements OnInit, OnDestroy {
  @Input() showAllProducts: boolean;
  products: ProductDto[];
  groups: { groupName: string; checked?: boolean }[] = [];
  private _subs = new SubSink();
  constructor(private _productsFacade: ProductsFacade) {}
  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  onSelectionChanged(group: any): void {
    this._productsFacade.onGroupSelected(group);
  }

  private _subcribeToProducts() {
    if (!this.showAllProducts) {
      this._subs.add(
        this._productsFacade.servicesOnly$.subscribe((x) => (this.products = x))
      );
    } else {
      this._subs.add(
        this._productsFacade.products$.subscribe((x) => (this.products = x))
      );
    }
  }

  ngOnInit(): void {
    this.groups = [
      { groupName: "*", checked: true },
      { groupName: "A" },
      { groupName: "B" },
      { groupName: "C" },
      { groupName: "D" },
      { groupName: "E" },
      { groupName: "F" },
      { groupName: "G" },
      { groupName: "H" },
      { groupName: "I" },
      { groupName: "J" },
      { groupName: "K" },
      { groupName: "L" },
      { groupName: "M" },
      { groupName: "N" },
      { groupName: "O" },
      { groupName: "P" },
      { groupName: "Q" },
      { groupName: "R" },
      { groupName: "S" },
      { groupName: "T" },
      { groupName: "U" },
      { groupName: "V" },
      { groupName: "W" },
      { groupName: "X" },
      { groupName: "Y" },
      { groupName: "Z" },
    ];
  }
}
