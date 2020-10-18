import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEventType,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/Operators';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Modify or log out-going requests
    // req is read-only, need to clone it
    const modifiedReq = req.clone({
      // by difault, httpClient will discard cookies in response, need to set withCredentials to "true"
      withCredentials: true,
    });
    // next.handle() will return an observable containing HttpResponse object
    return next.handle(modifiedReq).pipe(
      // filter((val) => val.type === HttpEventType.Sent),
      tap((val) => {
        // console.log(val); // HttpResponse object
        if (val.type === HttpEventType.Sent) {
          console.log('Request was sent to server');
        }
        if (val.type === HttpEventType.Response) {
          console.log('Got a response from API');
        }
      })
    );
  }
}
