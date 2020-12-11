import { Injectable } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { JobDetailsDto, JobDto } from "@shared/service-proxies/service-proxies";
import { BehaviorSubject } from "rxjs";

import { AddJobModalComponent } from "./add-job-modal/add-job-modal.component";
import { AddJobVisitModalComponent } from "./add-job-visit-modal/add-job-visit-modal.component";
import { JobFormsListModalComponent } from "./job-forms-list-modal/job-forms-list-modal.component";
import { JobVisitDetailModalComponent } from "./job-visit-detail-modal/job-visit-detail-modal.component";
export class JobVerticalModalModel {
  jobDto?: JobDto;
  open: boolean;
}
@Injectable()
export class JobsModalService {
  private jobVerticalModalBehaviour: BehaviorSubject<JobVerticalModalModel> = new BehaviorSubject<JobVerticalModalModel>(
    null
  );
  private modalConfig: any = {
    size: "lg",
    keyboard: false,
    backdrop: "static",
  };
  jobVerticalModalBehaviour$ = this.jobVerticalModalBehaviour.asObservable();

  constructor(private modalService: NgbModal) {}

  openJobDetailModal(open: boolean, job?: JobDto) {
    this.jobVerticalModalBehaviour.next({ jobDto: job, open: open });
  }

  openVisitDetailsModal() {
    this.modalConfig.size = "md";
    const modalRef = this.modalService.open(
      JobVisitDetailModalComponent,
      this.modalConfig
    );
    return modalRef;
  }

  openAddVisitDetailsModal(job: JobDetailsDto) {
    this.modalConfig.size = "lg";
    const modalRef = this.modalService.open(
      AddJobVisitModalComponent,
      this.modalConfig
    );
    modalRef.componentInstance.job = job;
    return modalRef;
  }

  openJobFormListModal(jobId: number): NgbModalRef {
    console.log("HELLO WORLD");
    this.modalConfig.size = "md";
    const modalRef = this.modalService.open(
      JobFormsListModalComponent,
      this.modalConfig
    );
    modalRef.componentInstance.jobId = jobId;
    return modalRef;
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
