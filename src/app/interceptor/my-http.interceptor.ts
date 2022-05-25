import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, finalize } from 'rxjs';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let ok: string;
    let authReq: HttpRequest<any> = req.clone({
      headers: req.headers
        .set(
          'Authorization',
          'Bearer ' +
            'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY1MzQ2MDgyNCwiZXhwIjoxOTY4ODIwODI0fQ.oWpOQSadBwXnnCGBh1Km2qmAIK0AYCq6KzMT4FAlKufhoL8xgs6afljv3vFB-LA72hM86BwKwekguRBxu4IQpQ'
        )
        .set('X-TENANT-ID', 'fe_0122a'),
    });

    return next.handle(authReq).pipe(
      tap(
        event => {
          ok = event instanceof HttpResponse ? 'succeeded' : ''
        },
        error => { }
        ),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        }),
        finalize(() => {
        })
    );;
  }
}
