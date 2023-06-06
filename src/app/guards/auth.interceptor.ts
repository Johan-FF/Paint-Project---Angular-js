import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/api-users/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken()

    if (request.url.includes('/login') || request.url.includes('/new_user')) {
      return next.handle(request)
    }

    const authReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    })

    return next.handle(authReq)
  }
}
