import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExpenseFacade } from "@core-data/index";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-add-expense-modal",
  templateUrl: "./add-expense-modal.component.html",
  styleUrls: ["./add-expense-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddExpenseModalComponent implements OnInit {
  expenseFormGroup: FormGroup;
  constructor(
    private _expenseFacade: ExpenseFacade,
    private _activateModal: NgbActiveModal,
    private _fb: FormBuilder
  ) {}

  private _initExpenseForm() {
    this.expenseFormGroup = this._fb.group({
      expenseId: [0],
      expenseDate: [],
      title: ["", [Validators.required, Validators.maxLength(300)]],
      description: [""],
      amount: [0.0, [Validators.required]],
      jobId: [0],
      expenseCodeId: [0],
    });
  }

  onCancelClicked() {
    this._activateModal.dismiss(null);
  }

  onSaveButtonClicked() {}

  ngOnInit(): void {
    this._initExpenseForm();
  }
}
