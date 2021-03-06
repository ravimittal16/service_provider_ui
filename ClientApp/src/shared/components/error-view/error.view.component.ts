import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  OnDestroy,
} from "@angular/core";
import { Observable } from "rxjs";
import { SubSink } from "subsink";
import { distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-error-view",
  templateUrl: "./error.view.component.html",
  styleUrls: ["./error.view.component.scss"],
})
export class AppErrorViewComponent implements OnInit, OnDestroy {
  @Input() alertType: "error" | "success" | "warning" = "error";
  @Input() errors$: Observable<string[]> | string[];
  @Input() observableDefined: boolean = false;
  @Input() autoHide: boolean = false;
  @Input() interval: number = 3000;
  errors: string[] = [];
  private _sink = new SubSink();

  constructor(private _cdr: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this._sink.unsubscribe();
  }

  ngOnInit() {
    if (this.observableDefined && this.errors$) {
      this._sink.add(
        (this.errors$ as Observable<string[]>)
          .pipe(distinctUntilChanged())
          .subscribe((errors) => {
            this.errors = [];
            if (errors) {
              this.errors = [...errors];
              this._cdr.detectChanges();
            }
          })
      );
    }
  }
}
