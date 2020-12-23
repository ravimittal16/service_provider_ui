import { Component, Input, OnInit } from "@angular/core";
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
  @Input() editedModel: ExpenseCodeModel;
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
      this._expenseFacade.addUpdateExpenseCode(_model, this._activateModal);
    }
  }

  private __initExpenseCodeForm() {
    const __isForNew =
      this.editedModel === null || this.editedModel === undefined;
    this.expenseCodeFormGroup = this._fb.group({
      expenseCodeId: [__isForNew ? 0 : this.editedModel.expenseCodeId],
      codeName: [
        __isForNew ? "" : this.editedModel.codeName,
        [Validators.required, Validators.maxLength(200)],
      ],
    });
  }

  ngOnInit(): void {
    this._expenseFacade.clearAllErrors();
    this.__initExpenseCodeForm();
  }
}
