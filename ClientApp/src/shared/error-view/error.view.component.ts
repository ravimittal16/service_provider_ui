import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-error-view",
  templateUrl: "./error.view.component.html",
  styleUrls: ["./error.view.component.less"],
})
export class AppErrorViewComponent implements OnInit {
  @Input() errors: [];
  constructor() {}

  ngOnInit() {}
}
