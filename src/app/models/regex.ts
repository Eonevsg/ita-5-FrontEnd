import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class Regex {
  nameRegex = new RegExp("^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ -]+$");
  phoneRegex = new RegExp("^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ -]+$");
  emailRegex = new RegExp("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$");
  generalRegex = new RegExp("[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ\\d\\n\\* \\.,\\-'\"]+");
}
