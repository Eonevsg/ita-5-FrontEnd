import { Component, NgZone, OnInit, ViewChild } from "@angular/core";

import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Person } from "../models/person";
import { Answer } from "../models/answer";
import { AnswerPerson } from "../models/answer-person";
import { ApplicationFormService } from "../services/application-form-service/form.service";
import { Observable } from "rxjs";
import { LanguageService } from "../services/language-service/language.service";

@Component({
  selector: "app-form-page",
  templateUrl: "./form-page.component.html",
  styleUrls: ["./form-page.component.css"],
})
export class FormPageComponent implements OnInit {
  messageTitle = "Registracija sėkmingai išsiųsta!";
  successMessage =
    "Registracijos patvirtinimas išsiųstas nurodytu el. pašto adresu. Atsakymą dėl dalyvavimo IT Akademijoje gausite ne vėliau nei Sausio 15d.";
  message = this.successMessage;
  isErrorMessage: boolean;
  showModal: boolean;
  $universities: Observable<string[]>;
  applicationForm = this.buildApplicationForm();
  buttonEnabled: boolean = true;
  questions: Answer[];

  constructor(
    private fb: FormBuilder,
    private formService: ApplicationFormService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    subscribeToValue(this.applicationForm, "contract", "contractExplanation");
    subscribeToValue(this.applicationForm, "shift", "shiftExplanation");
    this.$universities = this.formService.fetchSchools();
    this.applicationForm.controls["establishment"].setValue(0);
    this.formService.fetchQuestions().subscribe((data) => {
      this.questions = data;
    });
  }

  onSubmit(): void {
    this.applicationForm.markAllAsTouched();
    if (this.applicationForm.valid) {
      this.saveApplicationForm(this.getPersonAndAnswers());
      this.buttonEnabled = false;
    }
  }

  getFullQuestion(id: string): string {
    return this.languageService.getLanguage() === "lt"
      ? this.questions.find((question) => question.id === id).fullQuestion
      : this.questions.find((question) => question.id === id).enFullQuestion;
  }

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

  get establishmentOther() {
    return this.applicationForm.get("establishmentOther");
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

  get thirdPartyAgreement() {
    return this.applicationForm.get("thirdPartyAgreement");
  }

  show() {
    document.getElementById("overlay").classList.add("fadeIn");
    this.showModal = true;
  }

  hide() {
    document.getElementById("overlay").classList.remove("fadeIn");
    this.buttonEnabled = true;
    this.showModal = false;
  }

  buildApplicationForm() {
    return this.fb.group({
      fname: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
          Validators.pattern("^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ -]+$"),
        ],
      ],
      lname: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
          Validators.pattern("^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ -]+$"),
        ],
      ],
      phone: [
        "",
        [
          Validators.required,
          Validators.pattern("^(3706|\\+3706|86)+[0-9]{7}$"),
        ],
      ],
      email: [
        "",
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.pattern(
            "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"
          ),
        ],
      ],
      establishment: ["", [Validators.required, validateSelect]],
      establishmentOther: [
        "",
        [
          requiredIfValidator(
            () => this.applicationForm.get("establishment").value
          ),
          Validators.maxLength(1000),
          Validators.pattern("[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ\\d\\n\\* \\.,\\-'\"]+"),
        ],
      ],
      contract: ["", [Validators.required]],
      contractExplanation: [
        "",
        [
          requiredIfValidator(() => this.applicationForm.get("contract").value),
          Validators.maxLength(1000),
          Validators.pattern("[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ\\d\\n\\* \\.,\\-'\"]+"),
        ],
      ],
      shift: ["", [Validators.required]],
      shiftExplanation: [
        "",
        [
          requiredIfValidator(() => this.applicationForm.get("shift").value),
          Validators.maxLength(1000),
          Validators.pattern("[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ\\d\\n\\* \\.,\\-'\"]+"),
        ],
      ],
      hobbies: [
        "",
        [
          Validators.required,
          Validators.maxLength(1000),
          Validators.pattern("[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ\\d\\n\\* \\.,\\-'\"]+"),
        ],
      ],
      motivation: [
        "",
        [
          Validators.required,
          Validators.maxLength(1000),
          Validators.pattern("[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ\\d\\n\\* \\.,\\-'\"]+"),
        ],
      ],
      experience: ["", [Validators.required, Validators.maxLength(1000)]],
      marketing: [
        "",
        [
          Validators.required,
          Validators.maxLength(1000),
          Validators.pattern("[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ\\d\\n\\* \\.,\\-'\"]+"),
        ],
      ],
      thirdPartyAgreement: ["", [Validators.required]],
    });
  }

  getPersonAndAnswers(): AnswerPerson {
    this.isErrorMessage = false;
    let tempPerson: Person = null;
    let tempAnswerList: Answer[] = [];
    let establishmentValue = this.establishment.value;

    if (establishmentValue === "other") {
      establishmentValue = this.establishmentOther.value;
    }
    tempPerson = new Person(
      null,
      this.fname.value,
      this.lname.value,
      this.phone.value,
      this.email.value,
      establishmentValue,
      this.contract.value,
      null
    );
    tempAnswerList.push(new Answer("1", this.contractExplanation.value));
    tempAnswerList.push(new Answer("2", this.shiftExplanation.value));
    tempAnswerList.push(new Answer("3", this.hobbies.value));
    tempAnswerList.push(new Answer("4", this.motivation.value));
    tempAnswerList.push(new Answer("5", this.experience.value));
    tempAnswerList.push(new Answer("6", this.marketing.value));
    return new AnswerPerson(tempAnswerList, tempPerson);
  }

  saveApplicationForm(answerPerson: AnswerPerson) {
    this.formService.saveForm(answerPerson).subscribe(
      () => (
        (this.isErrorMessage = false),
        (this.messageTitle =
          this.languageService.getLanguage() === "lt"
            ? "Registracijos forma sėkmingai išsiųsta."
            : "Registration form successfully sent."),
        (this.message = this.successMessage),
        this.show()
      ),
      (error) => (
        (this.messageTitle =
          this.languageService.getLanguage() === "lt" ? "Klaida!" : "Error"),
        (this.message = error.error),
        (this.isErrorMessage = true),
        this.show()
      )
    );
  }
}

function requiredIfValidator(predicate) {
  return (formControl) => {
    if (!formControl.parent) {
      return null;
    }
    if (predicate() === "false" || predicate() === "other") {
      return Validators.required(formControl);
    }
    return null;
  };
}

function validateSelect(predicate: FormControl) {
  if (predicate.value == "0") {
    return {
      establishment: {
        valid: false,
      },
    };
  }
  return null;
}

function subscribeToValue(applicationForm, parent, child) {
  applicationForm.get(parent).valueChanges.subscribe((value) => {
    applicationForm.get(child).updateValueAndValidity();
  });
}
