import { Injectable } from "@angular/core";
import { AddUpdateExpenseCodeModalComponent } from "@app/expense-module/add-update-expense-code-modal/add-update-expense-code-modal.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Injectable({ providedIn: "root" })
export class SettingsModalService {
  private modalConfig: any = {
    size: "lg",
    keyboard: false,
    backdrop: "static",
  };
  constructor(private modalService: NgbModal) {}
  openExpenseCodeModal() {
    this.modalConfig.size = "md";
    const modalRef = this.modalService.open(
      AddUpdateExpenseCodeModalComponent,
      this.modalConfig
    );
    return modalRef;
  }
}
