import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgbPopover } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-delete-button",
  templateUrl: "./delete-button.component.html",
  styleUrls: ["./delete-button.component.scss"],
})
export class DeleteButtonComponent implements OnInit {
  @Input() buttonTitle: string;
  @Input() iconOnly: boolean;
  @Input() params: any;
  @Output() onConfirmation: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}
  onDeleteClicked(
    $event: MouseEvent,
    confirmationPopover: NgbPopover,
    finalCall: boolean
  ) {
    if (!finalCall) {
      confirmationPopover.open();
    } else {
      this.onConfirmation.emit();
    }
  }
  ngOnInit(): void {}
}
