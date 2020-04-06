import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth/auth.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    addEventListener("click", this.closeMenu);
  }
  logOutButtonClick() {
    this.authService.logOut();
    this.location.replaceState("/"); // clears browser history so they can't navigate with back button
    this.router.navigate(["home"]);
  }
  isLoggedIn() {
    return this.authService.getToken() ? true : false;
  }

  closeMenu() {
    var element = document.getElementById("navbarSupportedContent");
    if (element.classList.contains("show")) {
      element.classList.remove("show");
    }
  }
}
