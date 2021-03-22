import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable ,throwError } from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request instanceof HttpResponse) {
        console.log('bueno')
        // do stuff with response if you want
        request = request.clone({
            setHeaders: {
              'Content-Type': 'application/json',
            }
      });
    }


    return next.handle(request).pipe( tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {

        if (err.status === 400) {
            //this.router.navigate(['/user/homeadmin']);
        }
        return throwError( err );
      
      }
    }));
  }
}
