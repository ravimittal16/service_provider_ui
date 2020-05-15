import { Component, OnInit } from "@angular/core";

import { accountModuleAnimation } from "@shared/animations/routerTransition";
import { RegisterModel } from "@shared/service-proxies/service-proxies";

import { FormGroup, Validators, FormBuilder } from "@angular/forms";

import { Observable } from "rxjs";
import { RegsiterFacade } from "@core-data/register/register.facade";

@Component({
  templateUrl: "./register.component.html",
  animations: [accountModuleAnimation()],
  styleUrls: ["./register.component.less"],
})
export class RegisterComponent implements OnInit {
  model: RegisterModel = new RegisterModel();
  registerForm: FormGroup;
  errors$: Observable<string[]>;
  uiState$: Observable<boolean>;
  constructor(
    private _fb: FormBuilder,
    private _registerFacade: RegsiterFacade
  ) {}

  register(isValid): void {
    if (isValid) {
      const payload = this.registerForm.value as RegisterModel;
      this._registerFacade.processRegister(payload);
    }
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
    this.errors$ = this._registerFacade.errors$;
    this.uiState$ = this._registerFacade.uiState$;
  }
}
