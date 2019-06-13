import { Injectable } from '@angular/core';
import {  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class MainInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Request intercepted!");
    if(req.url.indexOf('google') == -1) {
        let authToken = localStorage.getItem('token');
        if(authToken) {
            let updatedReq = req.clone({
                headers : req.headers.set('Authorization','Bearer ' + authToken)
            })
            return next.handle(updatedReq);
        }
        else {
            return next.handle(req);
        }
    }
    else {
        return next.handle(req);
    }
  }
}