import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExpenseFacade } from "@core-data/index";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ExpenseCodeModel } from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";

@Component({
  selector: "app-add-update-expense-code-modal",
  templateUrl: "./add-update-expense-code-modal.component.html",
  styleUrls: ["./add-update-expense-code-modal.component.scss"],
})
export class AddUpdateExpenseCodeModalComponent implements OnInit {
  expenseCodeFormGroup: FormGroup;
  errors$: Observable<string[]>;
  constructor(
    private _expenseFacade: ExpenseFacade,
    private _activateModal: NgbActiveModal,
    private _fb: FormBuilder
  ) {
    this.errors$ = _expenseFacade.errors$;
  }

  onCancelClicked(): void {
    this._activateModal.close(null);
  }

  onSaveButtonClicked() {
    if (this.expenseCodeFormGroup.valid) {
      const _model = this.expenseCodeFormGroup.getRawValue() as ExpenseCodeModel;
      this._expenseFacade.addUpdateExpenseCode(_model);
    }
  }

  private __initExpenseCodeForm() {
    this.expenseCodeFormGroup = this._fb.group({
      expenseCodeId: [0],
      codeName: ["", [Validators.required, Validators.maxLength(200)]],
    });
  }

  ngOnInit(): void {
    this._expenseFacade.clearAllErrors();
    this.__initExpenseCodeForm();
  }
}
