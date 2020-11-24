import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationActionsModel } from "../ui.alerts.service";

@Component({
  selector: "app-confirmation-actions-modal",
  templateUrl: "./confirmation-actions-modal.component.html",
  styleUrls: ["./confirmation-actions-modal.component.scss"],
})
export class ConfirmationActionsModalComponent implements OnInit {
  @Input() dialogConfig: ConfirmationActionsModel;
  constructor(public activeModal: NgbActiveModal) {}

  onActionClicked(index: number) {
    this.activeModal.close(index);
  }

  ngOnInit(): void {}
}
