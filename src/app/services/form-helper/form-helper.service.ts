import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class FormHelperService {
  constructor(private fb: FormBuilder) {}

  public buildApplicationForm(establishment, contract, shift) {
    return this.fb.group({
      fname: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
          Validators.pattern("^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ -]+$")
        ]
      ],
      lname: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
          Validators.pattern("^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ -]+$")
        ]
      ],
      phone: [
        "",
        [
          Validators.required,
          Validators.pattern("^(3706|\\+3706|86)+[0-9]{7}$")
        ]
      ],
      email: [
        "",
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ],
      establishment: ["", [Validators.required, validateSelect]],
      establishmentOther: [
        "",
        [
          requiredIfValidator(
            () => establishment
          ),
          Validators.maxLength(150),
          Validators.pattern("^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ \\.,\\-'\"]+$")
        ]
      ],
      contract: ["", [Validators.required]],
      contractExplanation: [
        "",
        [
          requiredIfValidator(() => contract),
          Validators.maxLength(250),
          Validators.pattern("^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ \\.,\\-'\"]+$")
        ]
      ],
      shift: ["", [Validators.required]],
      shiftExplanation: [
        "",
        [
          requiredIfValidator(() => shift),
          Validators.maxLength(250),
          Validators.pattern("^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ \\.,\\-'\"]+$")
        ]
      ],
      hobbies: [
        "",
        [
          Validators.required,
          Validators.maxLength(450),
          Validators.pattern("^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ \\.,\\-'\"]+$")
        ]
      ],
      motivation: [
        "",
        [
          Validators.required,
          Validators.maxLength(450),
          Validators.pattern("^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ \\.,\\-'\"]+$")
        ]
      ],
      experience: [
        "",
        [
          Validators.required,
          Validators.maxLength(450),
          Validators.pattern("^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ \\.,\\-'\"]+$")
        ]
      ],
      marketing: [
        "",
        [
          Validators.required,
          Validators.maxLength(250),
          Validators.pattern("^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ \\.,\\-'\"]+$")
        ]
      ]
    });
  }
}
function requiredIfValidator(predicate) {
  return formControl => {
    if (!formControl.parent) {
      return null;
    }
    if (predicate() === "no" || predicate() === "kita") {
      return Validators.required(formControl);
    }
    return null;
  };
}

function validateSelect(predicate: FormControl) {
  if (predicate.value == "0") {
    return {
      establishment: {
        valid: false
      }
    };
  }
  return null;
}
