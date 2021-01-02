import { Injectable } from "@angular/core";
import { AddUpdateExpenseCodeModalComponent } from "@app/expense-module/add-update-expense-code-modal/add-update-expense-code-modal.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  CustomFieldDto,
  ExpenseCodeModel,
} from "@shared/service-proxies/service-proxies";
import { AddUpdateCustomFieldModalComponent } from "./custom-fields/add-update-custom-field-modal/add-update-custom-field-modal.component";

@Injectable({ providedIn: "root" })
export class SettingsModalService {
  private modalConfig: any = {
    size: "lg",
    keyboard: false,
    backdrop: "static",
  };
  constructor(private modalService: NgbModal) {}
  openExpenseCodeModal(editedModel: ExpenseCodeModel) {
    this.modalConfig.size = "md";
    const modalRef = this.modalService.open(
      AddUpdateExpenseCodeModalComponent,
      this.modalConfig
    );
    modalRef.componentInstance.editedModel = editedModel;
    return modalRef;
  }

  openCustomFieldDefinationModal(editModelRef: CustomFieldDto) {
    this.modalConfig.size = "md";
    const modalRef = this.modalService.open(
      AddUpdateCustomFieldModalComponent,
      this.modalConfig
    );
    modalRef.componentInstance.customFieldEditModel = editModelRef;
    return modalRef;
  }
}
