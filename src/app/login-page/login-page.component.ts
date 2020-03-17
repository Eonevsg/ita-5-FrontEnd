import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ErrorHandlerService} from '../services/error-handler.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private http: HttpClient) {  }

  onSubmit(value: any) {
    console.log(value);
    this.http.post('https://ita-5-back-staging.herokuapp.com/login', value, {observe: 'response'}).subscribe(response => {
      console.log(response.headers.get('Authorization'));
    });
  }

  ngOnInit(): void {
  }

}
