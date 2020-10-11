import { Injectable } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AddJobModalComponent } from "./add-job-modal/add-job-modal.component";

@Injectable()
export class JobsDataService {
  constructor(private modalService: NgbModal) {}

  openCreateJobModal(): NgbModalRef {
    const modalRef = this.modalService.open(AddJobModalComponent, {
      size: "lg",
      keyboard: false,
      backdrop: "static",
    });

    return modalRef;
  }
}
