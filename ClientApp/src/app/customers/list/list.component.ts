import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { NgbModal, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { CustomersFacade } from "@core-data/customers/customers.facade";
import { Observable, of } from "rxjs";
import { CustomerDto } from "@shared/service-proxies/service-proxies";
import { tap, map } from "rxjs/operators";
import { Dictionary } from "@ngrx/entity";
import { GridOptions, ColDef } from "ag-grid-community";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  closeResult = "";
  rowData: [] = [];
  customers$: Observable<CustomerDto[]>;
  gridOptions: GridOptions;
  constructor(
    private modalService: NgbModal,
    private calendar: NgbCalendar,
    private customerFacade: CustomersFacade
  ) {
    this.customers$ = customerFacade.customers$.pipe(
      tap((customer) => console.log(customer))
    );
  }

  importCustomers(): void {
    this.customerFacade.importCustomers();
  }

  initGrid() {}

  columnDefs: ColDef[] = [
    {
      sortable: true,
      filter: true,
      checkboxSelection: true,
      width: 60,
      headerCheckboxSelection: true,
    },
    {
      headerName: "Display Name",
      field: "displayName",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Customer Name",
      field: "fullName",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Company",
      field: "companyName",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Email",
      field: "primaryEmailAddr",
      sortable: true,
      filter: true,
      width: 250,
    },
    {
      headerName: "Mobile",
      field: "mobile",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Phone",
      field: "primaryPhone",
      sortable: true,
      filter: true,
    },
  ];

  open(content): void {}
  ngOnInit(): void {
    this.customerFacade.loadCustomers(1);
  }
}
