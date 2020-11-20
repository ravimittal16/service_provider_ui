import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-job-visit-detail-modal",
  templateUrl: "./job-visit-detail-modal.component.html",
  styleUrls: ["./job-visit-detail-modal.component.scss"],
})
export class JobVisitDetailModalComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
