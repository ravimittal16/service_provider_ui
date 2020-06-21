import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import {
  AuthenticateModel,
  AuthenticateResultModel,
  AccountServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { finalize } from "rxjs/operators";
import { NWTokenService } from "@shared/services/token.service";
import { Observable } from "rxjs";

@Injectable()
export class LoginService {
  static readonly twoFactorRememberClientTokenName =
    "TwoFactorRememberClientToken";

  authenticateModel: AuthenticateModel;
  authenticateResult: AuthenticateResultModel;

  rememberMe: boolean;

  constructor(
    private _tokenAuthService: AccountServiceProxy,
    private _tokenService: NWTokenService
  ) {
    this.clear();
  }

  loginUser(model: AuthenticateModel): Observable<AuthenticateResultModel> {
    return this._tokenAuthService.login(this.authenticateModel);
  }

  setToken(response: AuthenticateResultModel, rememberMe?: boolean): void {
    const tokenExpireDate = rememberMe
      ? new Date(new Date().getTime() + 1000 * response.expireInSeconds)
      : new Date(new Date().getTime() + 1000 * response.expireInSeconds + 10);
    this._tokenService.setToken(response.accessToken, tokenExpireDate);
  }

  private clear(): void {
    this.authenticateModel = new AuthenticateModel();
    this.authenticateModel.rememberClient = false;
    this.authenticateResult = null;
    this.rememberMe = false;
  }
}
