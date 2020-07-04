import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  Input,
} from "@angular/core";

import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { IConfirmationDialogConfig } from "../ui.alerts.service";

@Component({
  selector: "app-confirmation-modal",
  templateUrl: "./confirmation.modal.component.html",
  styleUrls: ["./confirmation.modal.component.scss"],
})
export class AppConfirmationModalComponent implements OnInit, OnDestroy {
  @Input() confirmationConfig: IConfirmationDialogConfig;

  constructor(
    public activeModal: NgbActiveModal,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {}
  ngOnInit() {}
}
