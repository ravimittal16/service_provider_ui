import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExpenseFacade, UsersFacade } from "@core-data/index";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
  CreateExpenseModel,
  ExpenseCodeModel,
  ILocalDate,
  LocalDate,
  TeamDto,
} from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";
import * as moment from "moment";

@Component({
  selector: "app-add-expense-modal",
  templateUrl: "./add-expense-modal.component.html",
  styleUrls: ["./add-expense-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddExpenseModalComponent implements OnInit {
  @Input() jobId?: number;
  expenseFormGroup: FormGroup;
  expenseCodes$: Observable<ExpenseCodeModel[]>;
  teams$: Observable<TeamDto[]>;
  constructor(
    private _expenseFacade: ExpenseFacade,
    private _usersFacade: UsersFacade,
    private _activateModal: NgbActiveModal,
    private _fb: FormBuilder
  ) {
    this.expenseCodes$ = _expenseFacade.expenseCodes$;
    this.teams$ = this._usersFacade.teams$;
  }

  private _initExpenseForm() {
    this.expenseFormGroup = this._fb.group({
      expenseId: [0],
      expenseDate: [],
      title: ["", [Validators.required, Validators.maxLength(300)]],
      reimburseToEmployeeId: [null],
      description: [""],
      amount: [0.0, [Validators.required]],
      jobId: [0],
      expenseCode: [null],
    });
  }

  onCancelClicked() {
    this._activateModal.dismiss(null);
  }

  onSaveButtonClicked() {
    if (this.expenseFormGroup.valid) {
      const __modal = this.expenseFormGroup.getRawValue() as CreateExpenseModel;
      __modal.jobId = this.jobId;
      __modal.expenseDate = moment();
      this._expenseFacade.addUpdareExpense(__modal, this._activateModal);
    }
  }

  ngOnInit(): void {
    this._expenseFacade.fetchAllExpenseCodes();
    this._initExpenseForm();
  }
}
