import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  private token: string;
  hasError = false;
  isSelected = false;


  constructor(private http: HttpClient, private router: Router, private location: Location) {
  }

  onSubmit(value: any) {
    console.log(value);
    this.http.post('https://ita-5-back-staging.herokuapp.com/login', value, {observe: 'response'}).subscribe(
      response => {
        this.token = response.headers.get('Authorization');
        this.location.replaceState('/'); // clears browser history so they can't navigate with back button
        this.router.navigate(['list']);
      },
      error => {
        console.error('Incorrect credentials!', error);
        this.hasError = true;
        this.isSelected = false;
      }
    );
  }

  ngOnInit(): void {
  }

}


