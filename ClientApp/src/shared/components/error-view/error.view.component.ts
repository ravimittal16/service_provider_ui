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
  @Input() errors$: Observable<string[]>;
  @Input() observableDefined: boolean = false;
  errors: string[] = [];
  private _sink = new SubSink();

  constructor(private _cdr: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this._sink.unsubscribe();
  }

  ngOnInit() {
    if (this.observableDefined && this.errors$) {
      this._sink.add(
        this.errors$.pipe(distinctUntilChanged()).subscribe((errors) => {
          if (errors) {
            console.log(errors);
            this.errors = [...errors];
            this._cdr.detectChanges();
          }
        })
      );
    }
  }
}
