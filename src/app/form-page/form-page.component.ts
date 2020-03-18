import { Component, OnInit } from "@angular/core";
import { Form } from "../models/form";
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from "@angular/forms";
import { FormService } from "../form-service/form.service";

@Component({
  selector: "app-form-page",
  templateUrl: "./form-page.component.html",
  styleUrls: ["./form-page.component.css"]
})
export class FormPageComponent implements OnInit {
  constructor(private formService: FormService, private fb: FormBuilder) {}
  form: Form;
  myForm: FormGroup;

  ngOnInit(): void {
    subscribeToValue(this.applicationForm, "contract", "contractExplanation");
    subscribeToValue(this.applicationForm, "shift", "shiftExplanation");
  }
  onSubmit() {
    
    this.myForm = new FormGroup({
      person: new FormGroup({
        name: this.fname,
        surname: this.lname,
        phone: this.phone,
        email: this.email,
        uni: this.establishment
      }),
      answerList: new FormArray([
        new FormGroup({
          questionId: new FormControl('1'),
          answer: this.contractExplanation,
        }),
        new FormGroup({
          questionId: new FormControl('2'),
          answer: this.shiftExplanation,
        }),
        new FormGroup({
          questionId: new FormControl('3'),
          answer: this.hobbies,
        }),
        new FormGroup({
          questionId: new FormControl('4'),
          answer: this.motivation,
        }),
        new FormGroup({
          questionId: new FormControl('5'),
          answer: this.experience,
        }),
        new FormGroup({
          questionId: new FormControl('6'),
          answer: this.marketing
        }),
      ])
    });
    console.log(this.myForm.value);
    this.formService.saveForm(this.myForm.value);
  }

  applicationForm = this.fb.group({
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
      [Validators.required, Validators.pattern("^(3706|\\+3706|86)+[0-9]{7}$")]
    ],
    email: [
      "",
      [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]
    ],
    establishment: [
      "",
      [
        Validators.required,
        Validators.maxLength(150),
        Validators.pattern("^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ \\.,\\-'\"]+$")
      ]
    ],
    contract: ["", [Validators.required]],
    contractExplanation: [
      "",
      [
        requiredIfValidator(() => this.applicationForm.get("contract").value),
        Validators.maxLength(250),
        Validators.pattern("^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ \\.,\\-'\"]+$")
      ]
    ],
    shift: ["", [Validators.required]],
    shiftExplanation: [
      "",
      [
        requiredIfValidator(() => this.applicationForm.get("shift").value),
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

  get fname() {
    return this.applicationForm.get("fname");
  }
  get lname() {
    return this.applicationForm.get("lname");
  }
  get phone() {
    return this.applicationForm.get("phone");
  }
  get email() {
    return this.applicationForm.get("email");
  }
  get establishment() {
    return this.applicationForm.get("establishment");
  }
  get contract() {
    return this.applicationForm.get("contract");
  }
  get contractExplanation() {
    return this.applicationForm.get("contractExplanation");
  }
  get shift() {
    return this.applicationForm.get("shift");
  }
  get shiftExplanation() {
    return this.applicationForm.get("shiftExplanation");
  }
  get hobbies() {
    return this.applicationForm.get("hobbies");
  }
  get motivation() {
    return this.applicationForm.get("motivation");
  }
  get experience() {
    return this.applicationForm.get("experience");
  }
  get marketing() {
    return this.applicationForm.get("marketing");
  }
}

function requiredIfValidator(predicate) {
  return formControl => {
    if (!formControl.parent) {
      return null;
    }
    if (predicate() == "no") {
      return Validators.required(formControl);
    }
    return null;
  };
}

function subscribeToValue(applicationForm, parent, child) {
  applicationForm.get(parent).valueChanges.subscribe(value => {
    applicationForm.get(child).updateValueAndValidity();
  });
}
