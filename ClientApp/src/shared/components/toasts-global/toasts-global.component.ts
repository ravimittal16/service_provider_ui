import { Component, OnInit, TemplateRef } from "@angular/core";
import { ToastService } from "@shared/services/toast.service";

@Component({
  selector: "app-toasts-global",
  templateUrl: "./toasts-global.component.html",
  styleUrls: ["./toasts-global.component.scss"],
  host: { "[class.ngb-toasts]": "true" },
})
export class ToastsGlobalComponent implements OnInit {
  constructor(public toastService: ToastService) {}

  ngOnInit(): void {}
}
