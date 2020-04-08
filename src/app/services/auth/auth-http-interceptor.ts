import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.handleAccess(req, next);
  }

  private handleAccess(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    let changedRequest;

    const headerSettings: { [name: string]: string | string[] } = {};

    request.headers
      .keys()
      .forEach(key => (headerSettings[key] = request.headers.getAll(key)));

    if (token) {
      headerSettings.Authorization = token;
    }
    headerSettings["Content-Type"] = "application/json";
    changedRequest = request.clone({
      headers: new HttpHeaders(headerSettings)
    });
    return next.handle(changedRequest).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 403 && err.status !== 400) {
              return this.router.navigate(['']);
            }
            return;
          }
        }
      )
    );
  }
}
