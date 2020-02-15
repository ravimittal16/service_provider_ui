import { Component, Injector, OnInit } from "@angular/core";
import { AbpSessionService } from "@abp/session/abp-session.service";

import { accountModuleAnimation } from "@shared/animations/routerTransition";
import { LoginService } from "./login.service";
import { AuthenticateModel } from "@shared/service-proxies/service-proxies";
import { FormGroup, FormControl, Validators } from "@angular/forms";
@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.less"],
  animations: [accountModuleAnimation()]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitting = false;

  constructor(
    injector: Injector,
    public loginService: LoginService,
    private _sessionService: AbpSessionService
  ) {}

  get multiTenancySideIsTeanant(): boolean {
    return this._sessionService.tenantId > 0;
  }

  get isSelfRegistrationAllowed(): boolean {
    if (!this._sessionService.tenantId) {
      return false;
    }

    return true;
  }

  login(): void {
    this.submitting = true;
    this.loginService.authenticateModel = this.loginForm
      .value as AuthenticateModel;
    this.loginService.authenticate(() => (this.submitting = false));
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userNameOrEmailAddress: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      rememberClient: new FormControl(false)
    });
  }
}
