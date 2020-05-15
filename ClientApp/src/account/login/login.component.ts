import { Component, OnInit } from "@angular/core";

import { accountModuleAnimation } from "@shared/animations/routerTransition";
import { LoginService } from "./login.service";
import { AuthenticateModel } from "@shared/service-proxies/service-proxies";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.less"],
  animations: [accountModuleAnimation()],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitting = false;

  constructor(private _fb: FormBuilder, public loginService: LoginService) {}

  login(): void {
    this.submitting = true;
    this.loginService.authenticateModel = this.loginForm
      .value as AuthenticateModel;
    this.loginService.authenticate(() => (this.submitting = false));
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
