import { Component, Injector, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { finalize } from "rxjs/operators";

import { accountModuleAnimation } from "@shared/animations/routerTransition";
import {
  AccountServiceProxy,
  RegisterInput,
  RegisterOutput
} from "@shared/service-proxies/service-proxies";
import { LoginService } from "../login/login.service";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

@Component({
  templateUrl: "./register.component.html",
  animations: [accountModuleAnimation()],
  styleUrls: ["./register.component.less"]
})
export class RegisterComponent implements OnInit {
  model: RegisterInput = new RegisterInput();
  saving = false;
  registerForm: FormGroup;
  constructor(
    injector: Injector,
    private _accountService: AccountServiceProxy,
    private _fb: FormBuilder,
    private _router: Router,
    private _loginService: LoginService
  ) {}

  back(): void {
    this._router.navigate(["/login"]);
  }

  register(): void {
    console.log(this.registerForm.value);
  }

  private _createRegisterForm(): void {
    this.registerForm = this._fb.group({
      fullName: ["", [Validators.required]],
      userName: ["", [Validators.required]],
      companyName: ["", [Validators.required]],
      emailAddress: ["", [Validators.required]],
      phoneNumber: [""],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
      privatePolicyCheck: [false]
    });
  }
  save(): void {}

  ngOnInit(): void {
    this._createRegisterForm();
  }
}
