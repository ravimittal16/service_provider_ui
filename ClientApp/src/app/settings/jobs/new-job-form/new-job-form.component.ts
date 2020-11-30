
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { JobFormsFacade } from "@core-data/job-forms-store/job.forms.facade";
import { JobFormDefinationDto } from "@shared/service-proxies/service-proxies";
import { SubSink } from "subsink";

@Component({
  selector: "app-new-job-form",
  templateUrl: "./new-job-form.component.html",
  styleUrls: ["./new-job-form.component.scss"],
})
export class NewJobFormComponent implements OnInit {
  private __formId: string;
  private _subs = new SubSink();
  private __definations: JobFormDefinationDto[];
  currentEditedDefination: JobFormDefinationDto;
  isForNewForm = false;
  constructor(
    private route: ActivatedRoute,
    private _jobFormsFacade: JobFormsFacade
  ) {}

  ngOnInit(): void {
    this.__formId = this.route.snapshot.queryParamMap.get("__formId");
    this.isForNewForm = this.__formId === null;
    this._subs.add(
      this._jobFormsFacade.formDefinations$.subscribe((definations) => {
        this.__definations = definations;
        if (this.__formId) {
          this.currentEditedDefination = definations.find(
            (x) => x.formId === +this.__formId
          );
        }
      })
    );
  }

}
