import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CompanyFacade } from "@core-data/company-store/company.facade";
import { JobFormsFacade } from "@core-data/job-forms-store/job.forms.facade";
import { NgbPopover } from "@ng-bootstrap/ng-bootstrap";
import {
  JobFormDefinationDto,
  SubscribedFeaturesDto,
} from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";
import { SubSink } from "subsink";

@Component({
  selector: "app-job-forms",
  templateUrl: "./job-forms.component.html",
  styleUrls: ["./job-forms.component.scss"],
})
export class JobFormsComponent implements OnInit, OnDestroy {
  private __allFeatues: SubscribedFeaturesDto[];
  private __featureKey = 2;
  jobFormsFeatureStatus: SubscribedFeaturesDto;
  showBanner = true;
  private _subs = new SubSink();
  private __deletePopover: NgbPopover;
  jobFormDefinations$: Observable<JobFormDefinationDto[]>;
  isBusy$: Observable<boolean>;
  constructor(
    private _router: Router,
    private _companyFacade: CompanyFacade,
    private _jobFormsFacade: JobFormsFacade
  ) {
    this.jobFormDefinations$ = _jobFormsFacade.formDefinations$;
    this.isBusy$ = _jobFormsFacade.isBusy$;
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  enableJobForms() {}

  createNewJobForm() {
    this._router.navigate(["app/settings/jobs/job-form"]);
  }

  onRowClicked(defination: JobFormDefinationDto) {
    if (defination) {
      //this._router.navigate(["app/settings/jobs/job-form"], );

      this._router.navigate(["app/settings/jobs/job-form"], {
        queryParams: { __formId: defination.formId },
      });
    }
  }

  private __checkIfFeatureEnabled() {
    if (this.__allFeatues) {
      this.jobFormsFeatureStatus = this.__allFeatues.find(
        (x) => x.featureId === this.__featureKey
      );
      this.showBanner =
        this.jobFormsFeatureStatus &&
        this.jobFormsFeatureStatus.entityStatus !== 0;
      if (!this.showBanner) {
        this._jobFormsFacade.loadAllFormDefinations();
      }
    }
  }

  deleteJobForm(
    $event: MouseEvent,
    defination: JobFormDefinationDto,
    popover: NgbPopover,
    finalClick: boolean
  ) {
    if (popover) this.__deletePopover = popover;
    if (!finalClick) {
      this.__deletePopover.open();
    } else {
      this._jobFormsFacade.deleteJobFormDefination(defination.formId);
    }

    $event.stopPropagation();
  }

  ngOnInit(): void {
    this._subs.add(
      this._companyFacade.features$.subscribe((features) => {
        if (features) {
          this.__allFeatues = features;
          this.__checkIfFeatureEnabled();
        }
      })
    );
  }
}
