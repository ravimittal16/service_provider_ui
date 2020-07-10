import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-add-edit-user-modal",
  templateUrl: "./add-edit-user-modal.component.html",
  styleUrls: ["./add-edit-user-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditUserModalComponent implements OnInit {
  userFormGroup: FormGroup;
  errors$: Observable<string[]>;
  @Input() selectedUser: any;
  selectedUserColor: string = "#1e62c9";
  isAdministrator = false;
  constructor(
    public activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder,
    private _cdr: ChangeDetectorRef
  ) {}
  isForNew = () => this.selectedUser === null;
  onFormSubmitted(): void {
    console.log(this.userFormGroup);
  }

  private _createForm(): void {
    this.userFormGroup = this._formBuilder.group({
      firstName: ["", [Validators.required, Validators.maxLength(100)]],
      lastName: ["", [Validators.maxLength(100)]],
      email: ["", [Validators.required, Validators.email]],
      createLogin: [false],
      userName: ["", [Validators.required, Validators.pattern(/\s/)]],
      password: [""],
      billRate: [0],
      mobile: [""],
      userColor: [""],
      primaryPhone: [""],
      employeeNumber: [""],
      EmployeeType: [],
      joiningDate: [],
      isAdministrator: [false],
    });
  }

  ngOnInit(): void {
    this._createForm();
  }
}
