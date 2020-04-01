import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Answer } from "../models/answer";
import { AnswerView } from "../models/answerView";
import { ApplicationFormService } from "../services/application-form-service/form.service";
import { ActivatedRoute } from "@angular/router";
import { from, Observable, empty } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { FormBuilder, Validators } from "@angular/forms";
import { Person } from "../models/person";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";

@Component({
  selector: "app-answer-details",
  templateUrl: "./answer-details.component.html",
  styleUrls: ["./answer-details.component.css"]
})
export class AnswerDetailsComponent implements OnInit {
  //Message variables
  private acceptMessage = "Priimta";
  private rejectMessage = "Atmesta";

  public answer$: Observable<AnswerView>;
  public questions: Answer[];
  public radioQuestionID: string[] = ["1", "2"];
  public showModal: boolean;
  public person$: Observable<Person>;
  @ViewChild("notesResizableArea") notesResizableArea: CdkTextareaAutosize;
  private statusValue: string;
  private personId: string;
  private tempApplVal: string = null;
  private tempTestVal: string = null;
  private tempInterVal: string = null;
  private tempNotes: string = null;
  private email: string;
  private phone: string;

  public message: string;
  public buttonValue: string;
  public buttonFunction: string;

  applicationValues: any[] = [
    { id: 1, value: "1" },
    { id: 2, value: "2" },
    { id: 3, value: "3" }
  ];
  testValues: any[] = [
    { id: 1, value: "1" },
    { id: 2, value: "2" },
    { id: 3, value: "3" },
    { id: 4, value: "4" },
    { id: 5, value: "5" },
    { id: 6, value: "6" },
    { id: 7, value: "7" },
    { id: 8, value: "8" },
    { id: 9, value: "9" },
    { id: 10, value: "10" }
  ];
  interviewValues: any[] = [
    { id: 1, value: "1" },
    { id: 2, value: "2" },
    { id: 3, value: "3" }
  ];

  constructor(
    private formService: ApplicationFormService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  valuationForm = this.fb.group({
    applicationValuation: ["", []],
    testValuation: ["", []],
    interviewValuation: ["", []],
    notes: ["", [Validators.maxLength(1000)]]
  });
  acceptanceForm = this.fb.group({
    state: ["", []]
  });

  get applicationValuation() {
    return this.valuationForm.get("applicationValuation");
  }

  get testValuation() {
    return this.valuationForm.get("testValuation");
  }

  get interviewValuation() {
    return this.valuationForm.get("interviewValuation");
  }

  get notes() {
    return this.valuationForm.get("notes");
  }

  get state() {
    return this.acceptanceForm.get("state");
  }

  show() {
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
  }

  ngOnInit(): void {
    this.formService.fetchQuestions().subscribe(data => {
      this.questions = data;
    });

    this.answer$ = from(this.route.paramMap).pipe(
      switchMap(params =>
        this.formService.fetchAnswer({ id: params.get("id") })
      )
    );
    this.answer$.subscribe(data => {
      console.log(data.person.extra);
      this.setExistingExtraValue(data.person.extra);
      this.updateStatus(data.person);
      this.personId = data.person.id;
      this.email = data.person.email;
      this.phone = data.person.phone;
    });
  }

  onSubmitValuation(): void {
    if (this.applicationValuation.value) {
      this.tempApplVal = this.applicationValuation.value;
    }
    if (this.testValuation.value) {
      this.tempTestVal = this.testValuation.value;
    }
    if (this.interviewValuation.value) {
      this.tempInterVal = this.interviewValuation.value;
    }
    if (this.notes.value) {
      this.tempNotes = this.notes.value;
    }
    this.formService.patchPerson({
      id: this.personId,
      extra: {
        applicationValuation: this.tempApplVal,
        testValuation: this.tempTestVal,
        interviewValuation: this.tempInterVal,
        notes: this.tempNotes
      }
    });
  }



  updateStatus(person: Person): any {
    if (person.extra.status.toLowerCase() === "nauja") {
      return this.formService.patchPerson({
        id: person.id,
        extra: { status: "Perskaityta" }
      });
    }
  }

  getFullQuestion(id: string): string {
    return this.questions.find(question => question.id === id).fullQuestion;
  }

  getAnswer(str: string, qId: string) {
    if (this.radioQuestionID.includes(qId)) {
      if (str) {
        return "Ne. " + str;
      } else {
        return "Taip";
      }
    } else {
      return str;
    }
  }

  changeApplicationValue(e) {
    this.applicationValuation.setValue(e.target.value, {
      onlySelf: true
    });
  }

  changeTestValue(e) {
    this.testValuation.setValue(e.target.value, {
      onlySelf: true
    });
  }

  changeInterviewValue(e) {
    this.interviewValuation.setValue(e.target.value, {
      onlySelf: true
    });
  }

  triggerResize() {
    this.notesResizableArea.resizeToFitContent(true);
  }

  getEmailOpenString(email: string) {
    return `mailto:${email}?subject=IT Akademija`;
  }

  setExistingExtraValue(extra: any) {
    if (extra.applicationValuation) {
      this.valuationForm.controls.applicationValuation.setValue(
        extra.applicationValuation
      );
    }
    if (extra.testValuation) {
      this.valuationForm.controls.testValuation.setValue(extra.testValuation);
    }
    if (extra.interviewValuation) {
      this.valuationForm.controls.interviewValuation.setValue(
        extra.interviewValuation
      );
    }
    if (extra.notes) {
      this.valuationForm.controls.notes.setValue(extra.notes);
    }
  }

  sendTest() {
    this.buttonValue = "Siųsti";
    this.message = `Nuoroda į testa bus išsiųsta el. paštu: ${this.email}`;
    this.buttonFunction ="onSendEmail";
    this.statusValue = "Testas";
    this.show();
  }
  inviteToInterview() {
    this.buttonValue = "Patvirtinti";
    this.message = `Su aplikantu bus susisiekta telefonu:\n ${this.phone}`;
    this.buttonFunction ="onConfirm";
    this.statusValue = "Interviu";
    this.show();
  }
  acceptApplication() {
    this.buttonValue = "Patvirtinti";
    this.message = `Su aplikantu bus susisiekta telefonu:\n ${this.phone}`;
    this.buttonFunction ="onConfirm";
    this.statusValue = "Priimta";
    this.show();

  }

  rejectApplication() {
    this.buttonValue = "Siųsti";
    this.message = `Neigiamas atsakymas aplikantui bus siunčiams el. paštu: ${this.email}`;
    this.buttonFunction ="onSendEmail";
    this.statusValue = "Atmesta";

    this.show();
  }
  refused() {
    this.buttonValue = "Patvirtinti";
    this.message = `Aplikantas atsisake`;
    this.buttonFunction ="onConfirm";
    this.statusValue = "Atsisakė";
    this.show();
  }

  onConfirm() {
    this.formService.patchPerson({
      id: this.personId,
      extra: { status: this.statusValue }
    });
    this.hide();
  }

  onSendEmail() {
    window.location.href = this.getEmailOpenString(this.email);
    this.formService.patchPerson({
      id: this.personId,
      extra: { status: this.statusValue }
    });
    this.hide();
  }
}
