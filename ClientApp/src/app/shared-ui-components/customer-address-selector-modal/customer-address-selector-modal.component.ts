import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
  AddressDto,
  CustomerDto,
  CustomersServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { SubSink } from "subsink";

@Component({
  selector: "app-customer-address-selector-modal",
  templateUrl: "./customer-address-selector-modal.component.html",
  styleUrls: ["./customer-address-selector-modal.component.scss"],
})
export class CustomerAddressSelectorModalComponent
  implements OnInit, OnDestroy {
  @Input() customerId: number | CustomerDto;
  customerAddresses: AddressDto[] = [];
  modalHeader: string = "";
  private __subs = new SubSink();
  constructor(
    public activeModal: NgbActiveModal,
    private _cdr: ChangeDetectorRef,
    private __customerServiceProxy: CustomersServiceProxy
  ) {}

  ngOnInit(): void {
    let __customerId = 0;
    if (typeof this.customerId === "number") {
      this.modalHeader = "Customer Addresses";
      __customerId = this.customerId as number;
    } else {
      const __dto = this.customerId as CustomerDto;
      __customerId = __dto.id;
      this.modalHeader = `${__dto.displayName}'s addresses`;
    }

    setTimeout(() => {
      this.__subs.add(
        this.__customerServiceProxy
          .getCustomerAddress(__customerId)
          .subscribe((response) => {
            this.customerAddresses = response;
            this._cdr.detectChanges();
          })
      );
    });
  }

  ngOnDestroy(): void {
    this.__subs.unsubscribe();
  }
}
