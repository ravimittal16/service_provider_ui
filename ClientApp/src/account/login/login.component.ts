import { Component, OnInit } from "@angular/core";

import { accountModuleAnimation } from "@shared/animations/routerTransition";

import { AuthenticateModel } from "@shared/service-proxies/service-proxies";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { LoginFacade } from "@core-data/login/login.facade";
import { Observable } from "rxjs/internal/Observable";
@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.less"],
  animations: [accountModuleAnimation()],
})
export class LoginComponent implements OnInit {
  isBusy$: Observable<boolean>;
  loginForm: FormGroup;
  submitting = false;

  constructor(private _fb: FormBuilder, private _loginFa: LoginFacade) {
    this.isBusy$ = _loginFa.isBusy$;
  }

  login(): void {
    this._loginFa.authenticateUser(
      this.loginForm.getRawValue() as AuthenticateModel
    );
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  private initLoginForm() {
    this.loginForm = this._fb.group({
      userNameOrEmailAddress: ["", [Validators.required]],
      password: ["", [Validators.required]],
      rememberClient: [false],
    });
  }
}
