import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { UiComponentsService } from "@app/shared-ui-components/ui.components.service";
import { JobsFacade } from "@core-data/jobs-store/jobs.facade";
import { JobActionListenerSchema } from "@core-data/jobs-store/jobs.state";
import {
  JobDetailsDto,
  JobVisitDto,
} from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";
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
  constructor(
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _uiComponentsService: UiComponentsService,
    private _modalService: JobsModalService,
    private _jobDataService: JobsDataService,
    private _jobFacade: JobsFacade
  ) {}

  visitCheckboxClicked(visit: JobVisitDto, $eventArgs: any) {
    $eventArgs.stopPropagation();
  }

  onVisitClicked($eventArgs: any, visit: JobVisitDto, openModal: boolean) {
    const __modal = this._modalService.openVisitDetailsModal();
    $eventArgs.stopPropagation();
  }

  onDeleteVisitClicked($event: any): void {
    $event.stopPropagation();
  }

  newVisitClicked() {
    const __addModal = this._modalService.openAddVisitDetailsModal(
      this.jobDetails
    );
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
