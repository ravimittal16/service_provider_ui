import { Component, OnInit } from "@angular/core";

import { accountModuleAnimation } from "@shared/animations/routerTransition";
import { LoginService } from "../../shared/services/login.service";
import { AuthenticateModel } from "@shared/service-proxies/service-proxies";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { LoginFacade } from "@core-data/login/login.facade";
@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.less"],
  animations: [accountModuleAnimation()],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitting = false;

  constructor(private _fb: FormBuilder, private _loginFa: LoginFacade) {}

  login(): void {
    // this.submitting = true;
    // this.loginService.authenticateModel = this.loginForm
    //   .value as AuthenticateModel;
    // this.loginService.authenticate(() => (this.submitting = false));
    this._loginFa.tryLogin(this.loginForm.getRawValue() as AuthenticateModel);
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
