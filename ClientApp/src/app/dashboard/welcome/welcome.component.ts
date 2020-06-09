import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent implements OnInit {
  constructor(private _router: Router) {}

  goToRoute(routeName: string): void {
    if (routeName) {
      this._router.navigate([routeName]);
    }
  }

  ngOnInit(): void {}
}
