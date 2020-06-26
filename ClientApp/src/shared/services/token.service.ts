import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class NWTokenService {
  private ID_TOKEN: string = "AUTH_TOKEN";
  private ID_TOKEN_EXPIRES_AT: string = "AUTH_TOKEN_EXPIRES_AT";

  constructor(private cookieService: CookieService) {}

  getToken(): string {
    // return localStorage.getItem(this.ID_TOKEN);
    return this.cookieService.get(this.ID_TOKEN);
  }

  clearToken() {
    if (window.localStorage) {
      ///localStorage.removeItem(this.ID_TOKEN);
      this.cookieService.delete(this.ID_TOKEN);
      localStorage.removeItem(this.ID_TOKEN_EXPIRES_AT);
    }
  }

  setToken(token: string, expirationDate: Date): void {
    if (window.localStorage) {
      //localStorage.setItem(this.ID_TOKEN, token);
      this.cookieService.set(this.ID_TOKEN, token);
      if (expirationDate) {
        localStorage.setItem(
          this.ID_TOKEN_EXPIRES_AT,
          JSON.stringify(expirationDate.valueOf())
        );
      }
    }
  }
}
