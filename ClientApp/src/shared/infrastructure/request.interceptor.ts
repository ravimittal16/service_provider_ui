import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { NWTOkenService } from "@shared/services/token.service";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class HttpReqInterceptor implements HttpInterceptor {
  constructor(_tokenService: NWTOkenService) {
    console.log("HELLO WORLD");
  }

  private blobToText(blob): Observable<any> {
    return new Observable(function(observer) {
      if (!blob) {
        observer.next("");
        observer.complete();
      } else {
        var reader = new FileReader();
        reader.onload = function() {
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
        this.blobToText(event.body).subscribe(json => {
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

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var _this = this;
    var interceptObservable = new Subject();

    if (!request.headers.has("Content-Type")) {
      request = request.clone({
        headers: request.headers.set("Content-Type", "application/json")
      });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (
            event.body instanceof Blob &&
            event.body.type &&
            event.body.type.indexOf("application/json") >= 0
          ) {
            this.blobToText(event.body).subscribe(json => {
              console.log("JSON", json);
            });
          }
        }
        return event;
      })
    );
  }
}
