import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class Regex {
  nameRegex = new RegExp("^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ -]+$");
  phoneRegex = new RegExp("^(3706|\\+3706|86)+[0-9]{7}$");
  emailRegex = new RegExp("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$");
  generalRegex = new RegExp("[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ\\d\\n\\* \\.,\\-'\"]+");
}
