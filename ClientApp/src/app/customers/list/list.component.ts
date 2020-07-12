import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomersFacade } from "@core-data/customers/customers.facade";
import { Observable, of } from "rxjs";
import { CustomerDto } from "@shared/service-proxies/service-proxies";

import { GridOptions, ColDef } from "ag-grid-community";
import { CustomerDisplayNameLinkCellRenderer } from "../grid-cell-renderers/display-name.link.cell.renderer";
import { EmailAddressLinkCellRenderer } from "@shared/grid-cell-renderers/email.address.cell.renderer";
import { CustomerActionsCellRenderer } from "../grid-cell-renderers/row.actions.cell.renderer";
import { Router } from "@angular/router";
import { CustomerEditCreateModalComponent } from "../customer-edit-create-modal/customer-edit-create-modal.component";
import { UiAlertsService } from "@app/shared-ui-components/ui.alerts.service";

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
  isBusy$: Observable<boolean>;
  gridOptions: GridOptions;
  selectedRecordsCount = 0;
  constructor(
    private modalService: NgbModal,
    private customerFacade: CustomersFacade,
    private _cdr: ChangeDetectorRef,
    private _router: Router,
    private _alertsService: UiAlertsService
  ) {
    this.customers$ = customerFacade.customers$;
    this.isBusy$ = customerFacade.isBusy$;
  }

  importCustomers(): void {
    this.customerFacade.importCustomers();
  }

  // ==========================================================
  // opening customer edit/add modal pop-up
  // ==========================================================
  private _openCustomerModal(customer?: CustomerDto) {
    const modalRef = this.modalService.open(CustomerEditCreateModalComponent, {
      size: "lg",
      keyboard: false,
      backdrop: "static",
    });
    this.customerFacade.onCustomerModalOpened();
    if (customer !== null) {
      this.customerFacade.loadEditedCustomerDetail(customer.id);
    }
    modalRef.componentInstance.selectedCustomer = customer;
  }

  processCustomerInactiveBulkAction(
    selectedCount: number,
    selectedIds: string[],
    fromBatch: boolean = false
  ) {
    const _pluralize = selectedCount > 1 ? "customers" : "customer";
    this._alertsService
      .confirm(
        "Confirmation",
        `Are you sure you want to in-active the selected ${_pluralize}?`
      )
      .then((result) => {
        if (result) {
          let ids = selectedIds;
          // ==========================================================
          // getting all selected Ids from customer grid
          // ==========================================================
          if (fromBatch) {
            const _selectedIds = this.gridOptions.api
              .getSelectedNodes()
              .map((x) => (x.data as CustomerDto).id.toString());
            ids = _selectedIds;
          }
          this.customerFacade.deactivateCustomers(ids);
        } else {
          // ==========================================================
          // deselectAll all rows on Confirmation Cancelled
          // ==========================================================
          if (fromBatch) this.gridOptions.api.deselectAll();
        }
      });
  }

  onBatchActionClicked(batchAction: "ínactive"): void {
    if (batchAction === "ínactive") {
      this.processCustomerInactiveBulkAction(
        this.selectedRecordsCount,
        null,
        true
      );
    }
  }

  triggerCustomerEvent(
    eventName:
      | "edit"
      | "details"
      | "createJob"
      | "createEstimate"
      | "report"
      | "delete"
      | "ínactive",
    customer: CustomerDto
  ) {
    if (eventName === "ínactive") {
      this.processCustomerInactiveBulkAction(1, [customer.id.toString()]);
    }
    if (eventName === "edit") {
      this._openCustomerModal(customer);
    }
    if (eventName === "details") {
      this._router.navigate(["app/customers/detail", customer.id]);
    }
  }

  initGrid() {
    this.gridOptions = <GridOptions>{
      columnDefs: this.columnDefs,
      context: this,
      rowSelection: "multiple",
      enableRangeSelection: true,
      suppressCellSelection: true,
      suppressRowClickSelection: true,
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
      onGridReady: (params) => {
        if (params.api) {
          params.api.sizeColumnsToFit();
        }
      },
    };
  }

  columnDefs: ColDef[] = [
    // {
    //   resizable: false,
    //   checkboxSelection: true,
    //   width: 60,
    //   headerCheckboxSelection: true,
    //   pinned: true,
    // },
    {
      headerName: "Actions",
      field: "",
      width: 80,
      checkboxSelection: false,
      suppressSorting: true,
      cellRenderer: "customerActionsCell",
      pinned: true,
    },
    {
      headerName: "Display Name",
      field: "displayName",
      sortable: true,
      filter: true,
      resizable: true,
      cellRenderer: "customerDisplayNameLink",
      width: 240,
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
      width: 120,
    },
    {
      headerName: "Phone",
      field: "primaryPhone",
      sortable: true,
      filter: true,
      resizable: true,
      width: 120,
    },
    {
      headerName: "Business Address",
      field: "businessAddress",
      sortable: true,
      filter: true,
      width: 300,
      resizable: true,
    },
  ];

  addNewCustomerClick(): void {
    this._openCustomerModal(null);
  }

  ngOnInit(): void {
    this.initGrid();
    this.customerFacade.loadCustomers(1);
  }
}
