import { TokenService } from "@abp/auth/token.service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import {
  AuthenticateModel,
  AuthenticateResultModel,
  AccountServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { finalize } from "rxjs/operators";

@Injectable()
export class LoginService {
  static readonly twoFactorRememberClientTokenName =
    "TwoFactorRememberClientToken";

  authenticateModel: AuthenticateModel;
  authenticateResult: AuthenticateResultModel;

  rememberMe: boolean;

  constructor(
    private _tokenAuthService: AccountServiceProxy,
    private _router: Router,
    private _tokenService: TokenService
  ) {
    this.clear();
  }

  authenticate(finallyCallback?: () => void): void {
    finallyCallback = finallyCallback || (() => {});

    this._tokenAuthService
      .login(this.authenticateModel)
      .pipe(
        finalize(() => {
          finallyCallback();
        })
      )
      .subscribe((result: AuthenticateResultModel) => {
        this.processAuthenticateResult(result);
      });
  }

  private processAuthenticateResult(
    authenticateResult: AuthenticateResultModel
  ) {
    this.authenticateResult = authenticateResult;
    if (authenticateResult.accessToken) {
      // Successfully logged in
      this.login(
        authenticateResult.accessToken,
        authenticateResult.encryptedAccessToken,
        authenticateResult.expireInSeconds,
        this.rememberMe
      );
    } else {
      this._router.navigate(["account/login"]);
    }
  }

  private login(
    accessToken: string,
    encryptedAccessToken: string,
    expireInSeconds: number,
    rememberMe?: boolean
  ): void {
    const tokenExpireDate = rememberMe
      ? new Date(new Date().getTime() + 1000 * expireInSeconds)
      : undefined;

    this._tokenService.setToken(accessToken, tokenExpireDate);
    this._router.navigate(["/app/home"]);
  }

  private clear(): void {
    this.authenticateModel = new AuthenticateModel();
    this.authenticateModel.rememberClient = false;
    this.authenticateResult = null;
    this.rememberMe = false;
  }
}
