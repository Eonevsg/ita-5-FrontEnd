import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "IT Akademija";

  constructor(public translate: TranslateService) {
    translate.addLangs(["lt", "en"]);
    translate.setDefaultLang("lt");
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
