import { Component, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { finalize } from "rxjs/operators";

import { accountModuleAnimation } from "@shared/animations/routerTransition";
import {
  AccountServiceProxy,
  RegisterInput,
  RegisterOutput
} from "@shared/service-proxies/service-proxies";
import { LoginService } from "../login/login.service";

@Component({
  templateUrl: "./register.component.html",
  animations: [accountModuleAnimation()],
  styles: [``]
})
export class RegisterComponent {
  model: RegisterInput = new RegisterInput();
  saving = false;

  constructor(
    injector: Injector,
    private _accountService: AccountServiceProxy,
    private _router: Router,
    private _loginService: LoginService
  ) {}

  back(): void {
    this._router.navigate(["/login"]);
  }

  save(): void {
    this.saving = true;
    this._accountService
      .register(this.model)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((result: RegisterOutput) => {
        if (!result.canLogin) {
          //  this.notify.success(this.l('SuccessfullyRegistered'));
          this._router.navigate(["/login"]);
          return;
        }

        // Autheticate
        this.saving = true;
        this._loginService.authenticateModel.userNameOrEmailAddress = this.model.userName;
        this._loginService.authenticateModel.password = this.model.password;
        this._loginService.authenticate(() => {
          this.saving = false;
        });
      });
  }
}
