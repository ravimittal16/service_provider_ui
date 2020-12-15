import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import { ActionReturnCode } from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs";

import { SubSink } from "subsink";

@Component({
  selector: "app-action-code-ui-renderer",
  templateUrl: "./action-code-ui-renderer.component.html",
  styleUrls: ["./action-code-ui-renderer.component.scss"],
})
export class ActionCodeUiRendererComponent implements OnInit, OnDestroy {
  @Input() actionResponseCode$: Observable<ActionReturnCode>;
  @Input() autoClose: boolean;
  @ViewChild("selfClosingAlert", { static: false }) selfClosingAlert: NgbAlert;
  alertType = "warning";
  private __subs = new SubSink();
  returnCode: ActionReturnCode;
  constructor() {}
  ngOnDestroy(): void {
    this.__subs.unsubscribe();
  }

  private __clearAlert() {
    setTimeout(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
        this.returnCode = null;
      }
    }, 5000);
  }

  ngOnInit(): void {
    if (this.actionResponseCode$) {
      this.__subs.add(
        this.actionResponseCode$.subscribe((returnCode) => {
          this.returnCode = returnCode;
          if (this.autoClose) {
            this.__clearAlert();
          }
          if (returnCode) {
            this.alertType =
              returnCode.codeType === 1
                ? "warning"
                : returnCode.codeType === 2
                ? "error"
                : "success";
          }
        })
      );
    }
  }
}
