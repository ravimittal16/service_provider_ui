import { Component, OnInit, ViewEncapsulation, Input } from "@angular/core";

@Component({
  selector: "app-logo",
  templateUrl: "./logo.component.html",
  styleUrls: ["./logo.component.less"],
  encapsulation: ViewEncapsulation.None
})
export class AppLogoComponent implements OnInit {
  @Input() size: "large" | "medium" | "small" = "large";
  constructor() {}
  ngOnInit(): void {}
}
