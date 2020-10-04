import { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

export class ErrorRenderer {
  private errorsSubject = new BehaviorSubject<string[]>([]);
  errors$: Observable<string[]>;

  constructor() {
    this.errors$ = this.errorsSubject.asObservable();
  }

  addError(error: string | string[]) {
    if (typeof error === "string") {
      this.errorsSubject.next([error]);
    } else {
      this.errorsSubject.next([...error]);
    }
  }
  clearErrors(): void {
    this.errorsSubject.next(null);
  }
}
