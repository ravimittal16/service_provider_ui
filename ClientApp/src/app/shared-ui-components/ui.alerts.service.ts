import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AppConfirmationModalComponent } from "@app/shared-ui-components/confirmation-modal/confirmation.modal.component";
import { Injectable, TemplateRef } from "@angular/core";
import { ConfirmationActionsModalComponent } from "./confirmation-actions-modal/confirmation-actions-modal.component";
export enum AlertType {
  Alert = 1,
  Toast = 2,
}

@Injectable()
export class UiAlertsService {
  constructor(private modalService: NgbModal) {}

  confirm(
    heading: string = "Confirmation",
    title: string,
    subTitle?: string,
    okButtonText: string = "Okay",
    cancelButtonText: string = "Cancel"
  ): Promise<boolean> {
    const _confirmation: IConfirmationDialogConfig = {
      title: title,
      heading: heading,
      subTitle: subTitle,
      okButtonText: okButtonText,
      cancelButtonText: cancelButtonText,
    };
    const modalRef = this.modalService.open(AppConfirmationModalComponent, {
      keyboard: false,
      backdrop: "static",
      centered: true,
    });
    modalRef.componentInstance.confirmationConfig = _confirmation;
    return <Promise<boolean>>modalRef.result;
  }

  showConfirmationActions(config: ConfirmationActionsModel): Promise<number> {
    const modalRef = this.modalService.open(ConfirmationActionsModalComponent, {
      keyboard: false,
      size: "sm",
      backdrop: "static",
      centered: true,
    });
    modalRef.componentInstance.dialogConfig = config;
    return <Promise<number>>modalRef.result;
  }

  alert(): any {}
  warning(): any {}
  showError(): any {}
  showSuccess(
    heading: string,
    title: string,
    alertType: AlertType = AlertType.Alert
  ): any {}
}
export interface IConfirmationDialogConfig {
  title: string;
  heading?: string;
  subTitle?: string;
  okButtonText: string;
  cancelButtonText: string;
}
export interface IConfirmationActionModel {
  title: string;
  actionClass: string;
  tooltip?: string;
}

export class ConfirmationActionsModel {
  closeOnConfirm?: boolean;
  actions: IConfirmationActionModel[];
  destructiveAction: IConfirmationActionModel;
  heading: string;
  message?: string;
  titleIcon?: string;
}
