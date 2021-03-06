import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { AuthService } from "../services/auth/auth.service";
import { User } from "../models/user";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"],
})
export class LoginPageComponent {
  private token: string;
  hasError = false;
  isSelected = false;
  showModal: boolean;

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService
  ) {}

  onSubmit(value: User) {
    this.authService.logIn(value).subscribe(
      (data) => {
        this.location.replaceState("/");
        this.router.navigate(["list"]);
      },
      (error) => {
        this.hasError = true;
        this.isSelected = false;
      }
    );
  }

  show() {
    document.getElementById("overlay").classList.add("fadeIn");
    this.showModal = true;
  }

  hide() {
    document.getElementById("overlay").classList.remove("fadeIn");
    this.showModal = false;
  }
}
