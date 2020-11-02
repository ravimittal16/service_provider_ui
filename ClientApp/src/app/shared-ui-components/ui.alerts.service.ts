import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AppConfirmationModalComponent } from "@app/shared-ui-components/confirmation-modal/confirmation.modal.component";
import { Injectable, TemplateRef } from "@angular/core";
export enum AlertType {
  Alert = 1,
  Toast = 2,
}
@Injectable()
export class UiAlertsService {
  toasts: any[] = [];
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

  private show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  private remove(toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
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
