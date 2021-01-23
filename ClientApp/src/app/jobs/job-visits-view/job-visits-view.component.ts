import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import {
  ConfirmationActionsModel,
  UiAlertsService,
} from "@app/shared-ui-components/ui.alerts.service";
import { UiComponentsService } from "@app/shared-ui-components/ui.components.service";
import { JobsFacade } from "@core-data/jobs-store/jobs.facade";
import { JobActionListenerSchema } from "@core-data/jobs-store/jobs.state";
import { NgbPopover } from "@ng-bootstrap/ng-bootstrap";
import {
  JobDetailsDto,
  JobVisitDto,
} from "@shared/service-proxies/service-proxies";
import { title } from "process";
import { Observable } from "rxjs";
import { JobVisitDetailModalComponent } from "../job-visit-detail-modal/job-visit-detail-modal.component";
import { JobsDataService } from "../jobs.data.service";
import { JobsModalService } from "../jobs.modal.service";

@Component({
  selector: "app-job-visits-view",
  templateUrl: "./job-visits-view.component.html",
  styleUrls: ["./job-visits-view.component.scss"],
})
export class JobVisitsViewComponent implements OnInit {
  @Input() jobId: number;
  visits$: Observable<JobVisitDto[]>;
  jobDetails: JobDetailsDto = null;
  isBusy = false;
  constructor(
    private _cdr: ChangeDetectorRef,
    private _modalService: JobsModalService,
    private _alertsService: UiAlertsService,
    private _jobDataService: JobsDataService,
    private _jobFacade: JobsFacade
  ) {}

  visitCheckboxClicked(visit: JobVisitDto, $eventArgs: any) {
    setTimeout(() => {
      console.log(visit.isChecked);
      this._jobFacade.markVisitAsCompleted(this.jobId, visit.visitId);
    }, 100);
    $eventArgs.stopPropagation();
  }

  onVisitClicked($eventArgs: any, visit: JobVisitDto, openModal: boolean) {
    this._jobFacade.prepareVisitDetails(visit.visitId);

    const __modal = this._modalService.openVisitDetailsModal(this.jobId);

    $eventArgs.stopPropagation();
  }

  onDeleteVisitClicked($event: any, visit: JobVisitDto): void {
    this._alertsService
      .showConfirmationActions({
        heading: "Delete Visit",
        actions: [
          { actionClass: "btn-danger", title: "Delete visit only" },
          { actionClass: "btn-danger", title: "Delete visit and items" },
        ],
        destructiveAction: {
          actionClass: "btn-default",
          title: "Don't do anything.",
        },
        closeOnConfirm: true,
        titleIcon: "fa-trash text-danger",
      })
      .then((index) => {
        if (index >= 0) {
          const _deleteItems = index === 1;
          this._jobFacade.deleteVisit(visit.visitId, this.jobId, _deleteItems);
        }
      });

    $event.stopPropagation();
  }

  newVisitClicked() {
    const __addModal = this._modalService.openAddVisitDetailsModal(
      this.jobDetails
    );
    __addModal.result.then((res: JobVisitDto) => {
      if (res) {
        this._jobFacade.onVisitAddCompleted(res, res.lineItems);
      }
    });
  }

  ngOnInit(): void {
    this.visits$ = this._jobFacade.visits$;
    this._jobFacade.selectedJobDetails$.subscribe((details) => {
      if (details) {
        this.jobDetails = details;
      }
    });
  }
}
