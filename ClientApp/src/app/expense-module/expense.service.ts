import { Injectable } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AddExpenseModalComponent } from "./add-expense-modal/add-expense-modal.component";

@Injectable({
  providedIn: "root",
})
export class ExpenseService {
  private modalConfig: any = {
    size: "lg",
    keyboard: false,
    backdrop: "static",
  };
  constructor(private modalService: NgbModal) {}

  openExpenseModal(jobId: number): NgbModalRef {
    this.modalConfig.size = "md";
    const modalRef = this.modalService.open(
      AddExpenseModalComponent,
      this.modalConfig
    );
    modalRef.componentInstance.jobId = jobId;
    return modalRef;
  }
}
