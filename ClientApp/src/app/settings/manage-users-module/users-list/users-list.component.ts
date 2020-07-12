import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import { GridOptions } from "ag-grid-community";
import { Observable } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UiAlertsService } from "@app/shared-ui-components/ui.alerts.service";
import { AddEditUserModalComponent } from "../add-edit-user-modal/add-edit-user-modal.component";
import { UsersFacade } from "@core-data/users-store/users.facade";
import { UserDto } from "@shared/service-proxies/service-proxies";
import { UsersActionsCellRenderer } from "../grid-cell-renderers/users.actions.cell.renderer";
import { CurrencyValueCellRenderer } from "@shared/grid-cell-renderers/currency.value.cell.renderer";
import { EmailAddressLinkCellRenderer } from "@shared/grid-cell-renderers/email.address.cell.renderer";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"],
})
export class UsersListComponent implements OnInit {
  @ViewChild("searchBox") searchBox: HTMLInputElement;
  gridOptions: GridOptions;
  users$: Observable<any[]>;
  searchContent: string;
  constructor(
    private modalService: NgbModal,
    private _usersFacade: UsersFacade,
    private _cdr: ChangeDetectorRef,
    private _alertsService: UiAlertsService
  ) {
    this.users$ = _usersFacade.users$;
  }

  triggerGridRowAction(
    action: "edit" | "details" | "createJob" | "report" | "ínactive",
    userData: UserDto
  ): void {
    if (action === "edit") {
      this._openUserModal(userData);
    }
  }

  // ==========================================================
  // opening user edit/add modal pop-up
  // ==========================================================
  private _openUserModal(userDto?: any) {
    const modalRef = this.modalService.open(AddEditUserModalComponent, {
      size: "lg",
      keyboard: false,
      backdrop: "static",
    });
    // this.customerFacade.onCustomerModalOpened();
    // if (customer !== null) {
    //   this.customerFacade.loadEditedCustomerDetail(customer.id);
    // }
    modalRef.componentInstance.selectedUser = userDto;
    this._usersFacade.onUserModalOpened();
  }

  private _initGridOptions() {
    this.gridOptions = <GridOptions>{
      columnDefs: [
        {
          headerName: "Actions",
          field: "",
          width: 80,
          checkboxSelection: false,
          suppressSorting: true,
          pinned: true,
          cellRenderer: "usersActionsCellRenderer",
        },
        {
          headerName: "Full Name",
          field: "fullName",
          sortable: true,
          filter: true,
          resizable: true,
          width: 200,
          pinned: true,
        },

        {
          headerName: "Role",
          field: "roleName",
          sortable: true,
          filter: true,
          resizable: true,
          width: 200,
        },
        {
          headerName: "Hourly Rate",
          field: "billRate",
          sortable: true,
          filter: true,
          resizable: true,
          width: 130,
          cellRenderer: "currencyValueCellRenderer",
        },
        {
          headerName: "Email",
          field: "email",
          sortable: true,
          filter: true,
          resizable: true,
          width: 250,
          cellRenderer: "emailAddressLinkCellRenderer",
        },
        {
          headerName: "Primary Phone",
          field: "primaryPhone",
          sortable: true,
          filter: true,
          resizable: true,
          width: 150,
        },
        {
          headerName: "Employee Number",
          field: "employeeNumber",
          sortable: true,
          filter: true,
          resizable: true,
          width: 200,
        },
      ],
      context: this,
      rowSelection: "multiple",
      enableRangeSelection: true,
      suppressCellSelection: true,
      suppressRowClickSelection: true,
      frameworkComponents: {
        usersActionsCellRenderer: UsersActionsCellRenderer,
        currencyValueCellRenderer: CurrencyValueCellRenderer,
        emailAddressLinkCellRenderer: EmailAddressLinkCellRenderer,
      },
      onSelectionChanged: (params) => {
        if (params.api) {
        }
      },
      onGridReady: (params) => {
        if (params.api) {
          //  params.api.sizeColumnsToFit();
        }
      },
    };
  }

  addNewUserClicked(): void {
    this._openUserModal(null);
  }

  ngOnInit(): void {
    this._initGridOptions();
    this._usersFacade.loadUsers();
  }
}
