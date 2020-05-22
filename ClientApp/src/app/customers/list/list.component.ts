import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
} from "@angular/core";
import {
  NgbModal,
  NgbCalendar,
  NgbDatepicker,
} from "@ng-bootstrap/ng-bootstrap";
import { CustomersFacade } from "@core-data/customers/customers.facade";
import { Observable } from "rxjs";
import { CustomerDto } from "@shared/service-proxies/service-proxies";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  closeResult = "";
  rowData: [] = [];
  customers$: Observable<CustomerDto[]>;
  constructor(
    private modalService: NgbModal,
    private calendar: NgbCalendar,
    private customerFacade: CustomersFacade
  ) {
    this.customers$ = customerFacade.customers$;
  }
  columnDefs = [
    {
      headerName: "Display Name",
      field: "make",
      sortable: true,
      filter: true,
      checkboxSelection: true,
    },
    {
      headerName: "Company Name",
      field: "model",
      sortable: true,
      filter: true,
    },
    { headerName: "Given Name", field: "price", sortable: true, filter: true },
    { headerName: "Given Name", field: "price", sortable: true, filter: true },
    {
      headerName: "Business Address Name",
      field: "price",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Customer Since",
      field: "price",
      sortable: true,
      filter: true,
    },
  ];

  open(content): void {}
  ngOnInit(): void {
    this.customerFacade.loadCustomers(1);
  }
}
