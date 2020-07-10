import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { GridOptions } from "ag-grid-community";
import { Observable } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UiAlertsService } from "@app/shared-ui-components/ui.alerts.service";
import { AddEditUserModalComponent } from "../add-edit-user-modal/add-edit-user-modal.component";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"],
})
export class UsersListComponent implements OnInit {
  gridOptions: GridOptions;
  users$: Observable<any[]>;

  constructor(
    private modalService: NgbModal,
    private _cdr: ChangeDetectorRef,
    private _alertsService: UiAlertsService
  ) {}

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
  }

  addNewUserClicked(): void {
    this._openUserModal(null);
  }

  ngOnInit(): void {}
}
