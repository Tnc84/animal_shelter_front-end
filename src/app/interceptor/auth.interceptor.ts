import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  

  constructor(private authenticatioService: AuthenticationService) {}

  intercept(HttpRequest: HttpRequest<any>, HttpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (HttpRequest.url.includes(`${this.authenticatioService.host}/user/login`)) {
      return HttpHandler.handle(HttpRequest)
    }
    if (HttpRequest.url.includes(`${this.authenticatioService.host}/user/register`)) {
      return HttpHandler.handle(HttpRequest)
    }
    if (HttpRequest.url.includes(`${this.authenticatioService.host}/user/resetpassword`)) {
      return HttpHandler.handle(HttpRequest)
    }
    this.authenticatioService.loadToken();
    const token = this.authenticatioService.getToken();
    const request = HttpRequest.clone({setHeaders: { Authorization: `Bearer ${token}`}});
    return HttpHandler.handle(request);
  }
}
 