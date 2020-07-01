import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-error-view",
  templateUrl: "./error.view.component.html",
  styleUrls: ["./error.view.component.scss"],
})
export class AppErrorViewComponent implements OnInit {
  @Input() errors$: Observable<string[]>;
  errors: string[] = [];
  constructor(private _cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.errors$.subscribe((errors) => {
      this.errors.push(...errors);
      this._cdr.detectChanges();
    });
  }
}
