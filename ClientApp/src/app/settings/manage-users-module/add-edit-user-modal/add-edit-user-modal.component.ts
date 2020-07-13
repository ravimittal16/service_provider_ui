import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  OnDestroy,
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { Observable, pipe } from "rxjs";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { SubSink } from "subsink";
import {
  GenericValidator,
  ValidationTypes,
} from "@shared/helpers/GenericValidator";
import { debounceTime, switchMap, distinctUntilChanged } from "rxjs/operators";
import { map } from "jquery";
import { UsersFacade } from "@core-data/users-store/users.facade";
import { CreateUserModel } from "@shared/service-proxies/service-proxies";

@Component({
  selector: "app-add-edit-user-modal",
  templateUrl: "./add-edit-user-modal.component.html",
  styleUrls: ["./add-edit-user-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditUserModalComponent implements OnInit, OnDestroy {
  userFormGroup: FormGroup;
  errors$: Observable<string[]>;
  isBusy$: Observable<boolean>;
  @Input() selectedUser: any;
  selectedUserColor: string = "#1e62c9";
  isAdministrator = false;
  private _subs = new SubSink();
  validationMessages: { [key: string]: string } = {};
  validator = new GenericValidator();
  constructor(
    public activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder,
    private _usersFacade: UsersFacade,
    private _cdr: ChangeDetectorRef
  ) {
    this.isBusy$ = _usersFacade.isBusy$;
    this.errors$ = _usersFacade.errors$;
  }

  isForNew = () => this.selectedUser === null;

  onFormSubmitted(): void {
    if (this.userFormGroup.invalid) {
      this.validationMessages = this.validator.processMessages(
        this.userFormGroup
      );
      this._cdr.detectChanges();
    } else {
      const _formModel = this.userFormGroup.getRawValue() as CreateUserModel;
      _formModel.userColor = this.selectedUserColor;
      this._usersFacade.triggerCreateUserAction(_formModel);
    }
  }

  isAdministratorField = () => this.userFormGroup.get("isAdministrator");

  onAdministratorSelectionChanged(event: any): void {
    setTimeout(() => {
      const isAdmin = this.isAdministratorField().value as boolean;
      const employeeTypeField = this.userFormGroup.get("employeeType");
      employeeTypeField.patchValue(-1, { emitEvent: false });
      if (isAdmin) {
        employeeTypeField.disable();
      } else {
        employeeTypeField.enable();
      }
      this._cdr.detectChanges();
    }, 10);
  }

  private _createForm(): void {
    this.userFormGroup = this._formBuilder.group({
      firstName: ["", [Validators.required, Validators.maxLength(100)]],
      lastName: ["", [Validators.maxLength(100)]],
      email: ["", [Validators.required, Validators.email]],
      createLogin: [false],
      userName: ["", [Validators.required, Validators.maxLength(50)]],
      password: [""],
      billRate: [0, [Validators.required]],
      mobile: [""],
      userColor: [""],
      primaryPhone: [""],
      employeeNumber: [""],
      employeeType: [-1],
      joiningDate: [],
      isAdministrator: [false],
    });
    this.validator.initilizeFormValitorMessages({
      firstName: {
        fieldName: "First Name",
        validationProps: [
          { validatorType: ValidationTypes.Required },
          { validatorType: ValidationTypes.MaxLength, withValue: 100 },
        ],
      },
      lastName: {
        fieldName: "Last Name",
        validationProps: [
          { validatorType: ValidationTypes.MaxLength, withValue: 100 },
        ],
      },
      email: {
        fieldName: "Email",
        validationProps: [
          { validatorType: ValidationTypes.Required },
          { validatorType: ValidationTypes.Email },
        ],
      },
      billRate: {
        fieldName: "Hourly Rate",
        validationProps: [{ validatorType: ValidationTypes.Required }],
      },
      userName: {
        fieldName: "User Name",
        validationProps: [
          { validatorType: ValidationTypes.Required },
          { validatorType: ValidationTypes.MaxLength, withValue: 50 },
        ],
      },
    });

    this.userFormGroup.statusChanges.pipe(debounceTime(300)).subscribe((s) => {
      if (s && s === "INVALID") {
        this.validationMessages = this.validator.processMessages(
          this.userFormGroup
        );
      } else {
        this.validationMessages = {};
      }
    });
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  ngOnInit(): void {
    this._createForm();
  }
}
