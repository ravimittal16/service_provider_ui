import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
  TeamDto,
} from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";
import * as moment from "moment";
import {
  GenericValidator,
  ValidationTypes,
} from "@shared/helpers/GenericValidator";
import { SubSink } from "subsink";

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
  private _subs = new SubSink();
  private __validator = new GenericValidator();
  validationMessages: { [key: string]: string } = {};
  constructor(
    private _expenseFacade: ExpenseFacade,
    private _usersFacade: UsersFacade,
    private _cdr: ChangeDetectorRef,
    private _activateModal: NgbActiveModal,
    private _fb: FormBuilder
  ) {
    this.expenseCodes$ = _expenseFacade.expenseCodes$;
    this.teams$ = this._usersFacade.teams$;
  }

  private _initExpenseForm() {
    const _date = new Date();
    this.expenseFormGroup = this._fb.group({
      expenseId: [0],
      expenseDate: [_date, [Validators.required]],
      title: ["", [Validators.required, Validators.maxLength(300)]],
      reimburseToEmployeeId: [null, [Validators.required]],
      description: [""],
      amount: [0.0, [Validators.required, Validators.min(0)]],
      jobId: [0],
      expenseCode: [null, [Validators.required]],
    });
    this.__validator.initilizeFormValitorMessages({
      title: {
        fieldName: "Title",
        validationProps: [
          { validatorType: ValidationTypes.Required },
          { validatorType: ValidationTypes.MaxLength, withValue: 200 },
        ],
      },
      amount: {
        fieldName: "Expense amount",
        validationProps: [
          { validatorType: ValidationTypes.Required },
          { validatorType: ValidationTypes.Min },
        ],
      },
      expenseDate: {
        fieldName: "Expense Date",
        validationProps: [{ validatorType: ValidationTypes.Required }],
      },
      reimburseToEmployeeId: {
        fieldName: "Reimburse To",
        validationProps: [{ validatorType: ValidationTypes.Required }],
      },
      expenseCode: {
        fieldName: "Accounting Code",
        validationProps: [{ validatorType: ValidationTypes.Required }],
      },
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
    } else {
      this.validationMessages = this.__validator.processMessages(
        this.expenseFormGroup
      );
      console.log(this.validationMessages);
      this._cdr.detectChanges();
    }
  }

  ngOnInit(): void {
    this._expenseFacade.fetchAllExpenseCodes();
    this._initExpenseForm();
  }
}
