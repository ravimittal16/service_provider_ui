import { Observable, BehaviorSubject } from "rxjs";

export class ErrorRenderer {
  private errorsSubject = new BehaviorSubject<string[]>([]);
  genericErrors: {
    generalError: "Error while executing this operation.";
  };
  errors$: Observable<string[]>;

  constructor() {
    this.errors$ = this.errorsSubject.asObservable();
  }

  notifyError(error: string | string[]) {
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
