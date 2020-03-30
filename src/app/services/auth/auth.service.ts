import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.prod";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { User } from "../../models/user";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  public logIn(user: User) {
    return this.httpClient
      .post(this.baseUrl + "/login", user, { observe: "response" })
      .pipe(
        tap(data => {
          sessionStorage.setItem(
            "authorization",
            data.headers.get("Authorization")
          );
          console.log(sessionStorage.getItem("authorization"));
        }),
        catchError(err => throwError(err))
      );
  }

  public getToken() {
    return sessionStorage.getItem("authorization");
  }

  public logOut() {
    sessionStorage.clear();
  }

  error(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
