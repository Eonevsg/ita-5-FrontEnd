import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { AuthService } from "../services/auth/auth.service";
import { User } from "../models/user";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent implements OnInit {
  private token: string;
  hasError = false;
  isSelected = false;

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService
  ) {}

  onSubmit(value: User) {
    console.log(value);
    this.authService.logIn(value).subscribe(
      data => {
        console.log(data);
        this.location.replaceState("/"); // clears browser history so they can't navigate with back button
        this.router.navigate(["list"]);
      },
      error => {
        console.error("Incorrect credentials!", error);
        this.hasError = true;
        this.isSelected = false;
      }
    );
  }

  ngOnInit(): void {}
}
