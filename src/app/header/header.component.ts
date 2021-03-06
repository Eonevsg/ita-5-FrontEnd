import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth/auth.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private translate: TranslateService
  ) {
    translate.addLangs(["lt", "en"]);
    translate.setDefaultLang("lt");
  }

  ngOnInit(): void {
    addEventListener("click", this.closeMenu);
  }
  logOutButtonClick() {
    this.authService.logOut();
    this.location.replaceState("/");
    this.router.navigate(["home"]);
  }
  isLoggedIn() {
    return this.authService.getToken() ? true : false;
  }

  closeMenu() {
    const element = document.getElementById("navbarSupportedContent");
    if (element.classList.contains("show")) {
      element.classList.remove("show");
    }
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
