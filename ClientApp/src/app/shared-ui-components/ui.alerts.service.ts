import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AppConfirmationModalComponent } from "@app/shared-ui-components/confirmation-modal/confirmation.modal.component";
import { Injectable } from "@angular/core";

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

  alert(): any {}
  warning(): any {}
  showError(): any {}
  showSuccess(): any {}
}
export interface IConfirmationDialogConfig {
  title: string;
  heading?: string;
  subTitle?: string;
  okButtonText: string;
  cancelButtonText: string;
}
