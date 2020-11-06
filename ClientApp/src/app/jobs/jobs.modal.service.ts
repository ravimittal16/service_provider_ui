import { Injectable } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { JobDto } from "@shared/service-proxies/service-proxies";
import { BehaviorSubject } from "rxjs";

import { AddJobModalComponent } from "./add-job-modal/add-job-modal.component";
export class JobVerticalModalModel {
  jobDto?: JobDto;
  open: boolean;
}
@Injectable()
export class JobsModalService {
  private jobVerticalModalBehaviour: BehaviorSubject<
    JobVerticalModalModel
  > = new BehaviorSubject<JobVerticalModalModel>(null);
  jobVerticalModalBehaviour$ = this.jobVerticalModalBehaviour.asObservable();

  constructor(private modalService: NgbModal) {}

  openJobDetailModal(open: boolean, job?: JobDto) {
    this.jobVerticalModalBehaviour.next({ jobDto: job, open: open });
  }

  openCreateJobModal(): NgbModalRef {
    const modalRef = this.modalService.open(AddJobModalComponent, {
      size: "lg",
      keyboard: false,
      backdrop: "static",
    });

    return modalRef;
  }
}
