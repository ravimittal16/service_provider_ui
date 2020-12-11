import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-job-forms-list-modal",
  templateUrl: "./job-forms-list-modal.component.html",
  styleUrls: ["./job-forms-list-modal.component.scss"],
})
export class JobFormsListModalComponent implements OnInit {
  @Input() jobId: number;
  constructor(public activeModal: NgbActiveModal) {}

  onCloseClicked(): void {}

  ngOnInit(): void {}
}
