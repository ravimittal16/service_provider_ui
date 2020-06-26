import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { NgbModal, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { CustomersFacade } from "@core-data/customers/customers.facade";
import { Observable, of } from "rxjs";
import { CustomerDto } from "@shared/service-proxies/service-proxies";
import { tap, map } from "rxjs/operators";
import { Dictionary } from "@ngrx/entity";
import { GridOptions, ColDef } from "ag-grid-community";
import { CustomerDisplayNameLinkCellRenderer } from "../grid-cell-renderers/display-name.link.cell.renderer";
import { EmailAddressLinkCellRenderer } from "@shared/grid-cell-renderers/email.address.cell.renderer";
import { CustomerActionsCellRenderer } from "../grid-cell-renderers/row.actions.cell.renderer";

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
  selectedRecordsCount = 0;
  constructor(
    private modalService: NgbModal,
    private calendar: NgbCalendar,
    private customerFacade: CustomersFacade,
    private _cdr: ChangeDetectorRef
  ) {
    this.customers$ = customerFacade.customers$;
  }

  importCustomers(): void {
    this.customerFacade.importCustomers();
  }

  initGrid() {
    this.gridOptions = <GridOptions>{
      columnDefs: this.columnDefs,
      rowSelection: "multiple",
      enableRangeSelection: true,
      suppressCellSelection: true,
      frameworkComponents: {
        customerDisplayNameLink: CustomerDisplayNameLinkCellRenderer,
        emailAddressLink: EmailAddressLinkCellRenderer,
        customerActionsCell: CustomerActionsCellRenderer,
      },
      onSelectionChanged: (params) => {
        if (params.api) {
          this.selectedRecordsCount = params.api.getSelectedNodes().length;
          this._cdr.detectChanges();
        }
      },
    };
  }

  columnDefs: ColDef[] = [
    {
      resizable: false,
      checkboxSelection: true,
      width: 60,
      headerCheckboxSelection: true,
      pinned: true,
    },
    {
      headerName: "Display Name",
      field: "displayName",
      sortable: true,
      filter: true,
      resizable: true,
      cellRenderer: "customerDisplayNameLink",
      width: 250,
      pinned: true,
    },
    {
      headerName: "Customer Name",
      field: "fullName",
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: "Company",
      field: "companyName",
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: "Email",
      field: "primaryEmailAddr",
      sortable: true,
      filter: true,
      width: 250,
      cellRenderer: "emailAddressLink",
      resizable: true,
    },
    {
      headerName: "Mobile",
      field: "mobile",
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: "Phone",
      field: "primaryPhone",
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: "Business Address",
      field: "businessAddress",
      sortable: true,
      filter: true,
      width: 300,
      resizable: true,
    },
    {
      headerName: "Action",
      field: "",
      width: 100,
      cellRenderer: "customerActionsCell",
    },
  ];

  addNewCustomerClick(): void {}

  ngOnInit(): void {
    this.initGrid();
    this.customerFacade.loadCustomers(1);
  }
}
