import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
} from "@angular/core";
import { CustomersFacade } from "@core-data/index";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomerDto } from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";
import { SharedDataService } from "../shared.data.service";

@Component({
  selector: "app-customer-selector-modal",
  templateUrl: "./customer-selector-modal.component.html",
  styleUrls: ["./customer-selector-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerSelectorModalComponent implements OnInit {
  groups: { groupName: string; checked?: boolean }[] = [];
  @Input() selectionCallback: (product: CustomerDto) => void;
  filterCustomersForModal$: Observable<CustomerDto[]>;
  searchCriteria: string;
  constructor(
    public activeModal: NgbActiveModal,
    private _sharedDateService: SharedDataService,
    private _customerStoreFacade: CustomersFacade
  ) {
    this.filterCustomersForModal$ =
      _customerStoreFacade.filterCustomersForModal$;
  }

  onCustomerRowClicked(customer: CustomerDto): void {
    console.log(customer);
  }

  onSelectionChanged(grp: any): void {
    this._customerStoreFacade.onGroupSelected(grp);
  }

  ngOnInit(): void {
    this.groups = this._sharedDateService.filterButtonsGroup;
  }
}
