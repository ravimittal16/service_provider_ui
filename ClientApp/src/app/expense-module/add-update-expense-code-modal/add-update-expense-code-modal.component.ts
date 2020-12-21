import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExpenseFacade } from "@core-data/index";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-add-update-expense-code-modal",
  templateUrl: "./add-update-expense-code-modal.component.html",
  styleUrls: ["./add-update-expense-code-modal.component.scss"],
})
export class AddUpdateExpenseCodeModalComponent implements OnInit {
  expenseCodeFormGroup: FormGroup;
  constructor(
    private _expenseFacade: ExpenseFacade,
    private _activateModal: NgbActiveModal,
    private _fb: FormBuilder
  ) {}

  onCancelClicked(): void {
    this._activateModal.close(null);
  }

  onSaveButtonClicked() {
    if (this.expenseCodeFormGroup.valid) {
    }
  }

  private __initExpenseCodeForm() {
    this.expenseCodeFormGroup = this._fb.group({
      expenseCodeId: [0],
      codeName: ["", [Validators.required, Validators.maxLength(200)]],
    });
  }

  ngOnInit(): void {
    this.__initExpenseCodeForm();
  }
}
