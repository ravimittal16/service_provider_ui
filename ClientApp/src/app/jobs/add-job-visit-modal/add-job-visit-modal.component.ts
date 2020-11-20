import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { JobDetailsDto } from "@shared/service-proxies/service-proxies";

@Component({
  selector: "app-add-job-visit-modal",
  templateUrl: "./add-job-visit-modal.component.html",
  styleUrls: ["./add-job-visit-modal.component.scss"],
})
export class AddJobVisitModalComponent implements OnInit {
  @Input() job: JobDetailsDto;
  newVistFormGroup: FormGroup;
  constructor(public activeModal: NgbActiveModal, private _fb: FormBuilder) {}
  private _initNewVisitForm() {
    this.newVistFormGroup = this._fb.group({
      title: ["", [Validators.required]],
    });
  }
  ngOnInit(): void {
    this._initNewVisitForm();
  }
}
