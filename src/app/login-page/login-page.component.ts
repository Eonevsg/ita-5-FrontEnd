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
export class LoginPageComponent {
  private token: string;
  hasError = false;
  isSelected = false;

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService
  ) {}

  onSubmit(value: User) {
    this.authService.logIn(value).subscribe(
      data => {
        this.location.replaceState("/"); // clears browser history so they can't navigate with back button
        this.router.navigate(["list"]);
      },
      error => {
        this.hasError = true;
        this.isSelected = false;
      }
    );
  }
}
