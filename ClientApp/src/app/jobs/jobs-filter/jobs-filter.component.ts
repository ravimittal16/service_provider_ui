import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-jobs-filter",
  templateUrl: "./jobs-filter.component.html",
  styleUrls: ["./jobs-filter.component.scss"],
})
export class JobsFilterComponent implements OnInit {
  jobFilterForm: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _cdr: ChangeDetectorRef
  ) {}

  private _buildFilterForm(): void {
    this.jobFilterForm = this._formBuilder.group({
      customer: [],
    });
  }

  applyFilters(): void {}

  ngOnInit(): void {
    this._buildFilterForm();
  }
}
