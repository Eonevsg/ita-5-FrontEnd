import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth/auth.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from '../services/language-service/language.service';

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
    private translate: TranslateService,
    private languageService: LanguageService
  ) {
    translate.addLangs(["lt", "en"]);
    translate.setDefaultLang("lt");
  }

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

  switchLang(lang: string) {
    this.translate.use(lang);
    this.languageService.setLanguage(lang);
  }
}
