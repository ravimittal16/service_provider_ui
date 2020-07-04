import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, Subject, throwError, of } from "rxjs";
import { Injectable } from "@angular/core";
import { NWTokenService } from "@shared/services/token.service";
import { map, catchError, switchMap } from "rxjs/operators";

@Injectable()
export class HttpReqInterceptor implements HttpInterceptor {
  constructor(private _tokenService: NWTokenService) {}

  private blobToText(blob): Observable<any> {
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

  private handleSuccessResponse(
    event: HttpEvent<any>,
    interceptObservable: Subject<any>
  ) {
    if (event instanceof HttpResponse) {
      if (
        event.body instanceof Blob &&
        event.body.type &&
        event.body.type.indexOf("application/json") >= 0
      ) {
        this.blobToText(event.body).subscribe((json) => {
          var responseBody = json == "null" ? {} : JSON.parse(json);
          interceptObservable.next(responseBody);
          interceptObservable.complete();
        });
      } else {
        interceptObservable.next(event);
        interceptObservable.complete();
      }
    } else {
      interceptObservable.next(event);
    }
  }

  handleErrorResponse(
    error: HttpErrorResponse,
    interceptObservable: Subject<any>
  ) {
    if (!(error.error instanceof Blob)) {
      return throwError(error);
    }
    return this.blobToText(error.error).pipe(
      switchMap((json) => {
        var errorBody = json == "" || json == "null" ? {} : JSON.parse(json);
        if (errorBody && errorBody["ErrorMessageClient"]) {
          // ==========================================================
          // means this will be a custom exception from the API | ServiceProviderException C#
          // ==========================================================
          var errorResponse = new HttpErrorResponse({
            headers: error.headers,
            status: error.status,
            statusText: errorBody["ErrorMessageClient"],
            error: new Blob([JSON.stringify(errorBody)], {
              type: "application/json",
            }),
          });
          return throwError(errorResponse.error);
        } else {
          return throwError(error.error);
        }
      })
    );
  }

  checkResponseTypeOrNull(response: HttpResponse<any>) {
    if (!response || !response.headers) {
      return null;
    }
    var contentType = response.headers.get("Content-Type");
    if (!contentType) {
      console.warn("Content-Type is not sent!");
      return null;
    }
    if (contentType.indexOf("application/json") < 0) {
      console.warn("Content-Type is not application/json: " + contentType);
      return null;
    }
    return response;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var _this = this;
    var interceptObservable = new Subject();
    let token = this._tokenService.getToken();
    if (!request.headers.has("Content-Type")) {
      request = request.clone({
        headers: request.headers.set("Content-Type", "application/json"),
      });
    }
    if (request.headers && token) {
      request = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + token),
      });
    }
    return next.handle(request).pipe(
      catchError((error) => {
        return this.handleErrorResponse(error, null);
      }),
      switchMap((event: HttpEvent<any>) => {
        if (event instanceof HttpErrorResponse) {
        } else if (event instanceof HttpResponse) {
          if (
            event.body instanceof Blob &&
            event.body.type &&
            event.body.type.indexOf("application/json") >= 0
          ) {
            this.blobToText(event.body).subscribe((json) => {
              var responseBody = json == "null" ? {} : JSON.parse(json);
              var modifiedResponse = this.checkResponseTypeOrNull(
                event.clone({
                  body: responseBody,
                })
              );
              return modifiedResponse.clone({
                body: new Blob([JSON.stringify(modifiedResponse.body)], {
                  type: "application/json",
                }),
              });
            });
          }
        }
        return of(event);
      })
    );
  }
}
