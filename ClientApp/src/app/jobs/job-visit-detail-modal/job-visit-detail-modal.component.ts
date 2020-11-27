import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { UiAlertsService } from "@app/shared-ui-components/ui.alerts.service";
import { JobsFacade } from "@core-data/jobs-store/jobs.facade";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
  JobDetailsDto,
  JobLineItemDto,
  JobVisitDto,
} from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";
import { SubSink } from "subsink";

@Component({
  selector: "app-job-visit-detail-modal",
  templateUrl: "./job-visit-detail-modal.component.html",
  styleUrls: ["./job-visit-detail-modal.component.scss"],
})
export class JobVisitDetailModalComponent implements OnInit, OnDestroy {
  @Input() visitId: number;
  @Input() jobId: number;
  private _subs = new SubSink();
  visitDetails: { visit: JobVisitDto; items: JobLineItemDto[] };
  job: JobDetailsDto = null;
  constructor(
    public activeModal: NgbActiveModal,
    private _alertsService: UiAlertsService,
    private _jobFacade: JobsFacade
  ) {}

  copyJobVisit($event) {
    this._alertsService
      .showConfirmationActions({
        heading: "Copy Visit",
        actions: [
          { actionClass: "btn-primary", title: "Copy visit only" },
          { actionClass: "btn-primary", title: "Copy visit and items" },
          {
            actionClass: "btn-primary",
            title: "Copy everything",
            tooltip: "Copy visit,items and notes",
          },
        ],
        destructiveAction: {
          actionClass: "btn-default",
          title: "Don't do anything",
        },
        closeOnConfirm: true,
        titleIcon: "fa-file-o text-primary",
      })
      .then((index) => {
        if (index >= 0) {
        }
      });

    $event.stopPropagation();
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  ngOnInit(): void {
    this._subs.add(
      this._jobFacade.selectedJobDetails$.subscribe((jobDetails) => {
        this.job = jobDetails;
      }),
      this._jobFacade.visitDetails$.subscribe((details) => {
        if (details) this.visitDetails = details;
      })
    );
  }
}
