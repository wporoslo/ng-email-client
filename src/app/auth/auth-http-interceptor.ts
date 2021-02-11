import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEventType,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Modify or log the outgoing request here
    const modifiedReq = req.clone({
      withCredentials: true,
    });
    return next.handle(modifiedReq);
    // how to use HttpInterceptor for debugging:
    // .pipe(
    //   filter((response) => response.type === HttpEventType.Sent),
    //   tap((response) => {
    //     if (response.type === HttpEventType.Sent) {
    //       console.log('successfully sent request!');
    //     }
    //   })
    // );
  }
}
