import {Injectable} from '@angular/core';
import {BackendUrlService} from '../backend-url-service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {User} from '../../models/user';
import {throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BackendUrlService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  private logInUrl = '/login';

  public logIn(user: User) {
    return this.httpClient.post(this.baseUrl + this.logInUrl, user, {observe: 'response'})
      .pipe(
        tap(data => {
          sessionStorage.setItem('authorization', data.headers.get('Authorization'));
          console.log(sessionStorage.getItem('authorization'));
        }),
        catchError((err) => throwError(err))
      );
  }

  public getToken() {
    return sessionStorage.getItem('authorization');
  }

  public logOut() {
    sessionStorage.clear();
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
