import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() {
  }

  public handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      // Client side error occurred
      console.error('An error occurred', errorResponse.error.message);
    } else {
      // Backend returned unsuccessful response code
      console.error(`Backed returned code ${errorResponse},` + `body was: ${errorResponse.error}`);
    }
    return throwError('Something bad happened, please try again later.');
  }
}
