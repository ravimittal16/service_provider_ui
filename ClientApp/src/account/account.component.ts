import {
  Component,
  ViewContainerRef,
  OnInit,
  ViewEncapsulation,
  Injector
} from "@angular/core";
import { LoginService } from "./login/login.service";
// import { AppComponentBase } from '@shared/app-component-base';

@Component({
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.less"],
  encapsulation: ViewEncapsulation.None
})
export class AccountComponent implements OnInit {
  versionText: string;
  currentYear: number;

  private viewContainerRef: ViewContainerRef;

  public constructor(injector: Injector, private _loginService: LoginService) {
    this.currentYear = new Date().getFullYear();
    // this.versionText = this.appSession.application.version + ' [' + this.appSession.application.releaseDate.format('YYYYDDMM') + ']';
  }

  showTenantChange(): boolean {
    //  return abp.multiTenancy.isEnabled;
    return true;
  }

  ngOnInit(): void {}
}
