import { Component, Injector, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { accountModuleAnimation } from "@shared/animations/routerTransition";
import { RegisterModel } from "@shared/service-proxies/service-proxies";

import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import {
  AppState,
  AccountRegisterAction,
  registrationErrors,
} from "src/core-data";
import { Observable } from "rxjs";

@Component({
  templateUrl: "./register.component.html",
  animations: [accountModuleAnimation()],
  styleUrls: ["./register.component.less"],
})
export class RegisterComponent implements OnInit {
  model: RegisterModel = new RegisterModel();
  saving = false;
  registerForm: FormGroup;
  errors$: Observable<string[]>;
  constructor(
    injector: Injector,
    private _fb: FormBuilder,
    private _router: Router,
    private _store: Store<AppState>
  ) {}

  back(): void {
    this._router.navigate(["/login"]);
  }

  register(): void {
    const payload = this.registerForm.value as RegisterModel;
    this._store.dispatch(new AccountRegisterAction(payload));
  }

  private _createRegisterForm(): void {
    this.registerForm = this._fb.group({
      fullName: ["", [Validators.required]],
      userName: ["", [Validators.required]],
      companyName: ["", [Validators.required]],
      emailAddress: ["", [Validators.required, Validators.email]],
      phoneNumber: [""],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
      privatePolicyCheck: [false],
    });
  }
  save(): void {}

  ngOnInit(): void {
    this._createRegisterForm();
    this.errors$ = this._store.pipe(select(registrationErrors));
  }
}
