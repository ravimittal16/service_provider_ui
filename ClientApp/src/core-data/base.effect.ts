import { Observable } from "rxjs";

import { switchMap } from "rxjs/operators";
import { isArray } from "lodash";
export abstract class BaseEffect {
  static somethingWentWrongErrorMessage = "Something went wrong.";
  blobToText(blob): Observable<any> {
    return new Observable(function (observer) {
      if (!blob) {
        observer.next("");
        observer.complete();
      } else {
        var reader = new FileReader();
        reader.onload = function () {
          observer.next(this.result);
          observer.complete();
        };
        reader.readAsText(blob);
      }
    });
  }

  parseErrorWithAction(error: any): Observable<any> {
    if (error instanceof Blob) {
      return this.blobToText(error).pipe(
        switchMap((json) => {
          var errorBody = json == "" || json == "null" ? {} : JSON.parse(json);
          if (errorBody && errorBody["ErrorMessageClient"]) {
            return new Observable(function (observer) {
              observer.next(errorBody["ErrorMessageClient"]);
              observer.complete();
            });
          } else if (
            errorBody &&
            errorBody["errors"] &&
            isArray(errorBody["errors"])
          ) {
            return new Observable(function (observer) {
              observer.next([...errorBody.errors]);
              observer.complete();
            });
          } else {
            return new Observable(function (observer) {
              observer.next(BaseEffect.somethingWentWrongErrorMessage);
              observer.complete();
            });
          }
        })
      );
    } else {
      return new Observable(function (observer) {
        observer.next(BaseEffect.somethingWentWrongErrorMessage);
        observer.complete();
      });
    }
  }
}
