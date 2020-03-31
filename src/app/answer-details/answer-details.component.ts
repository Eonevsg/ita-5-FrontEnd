import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Answer } from "../models/answer";
import { AnswerViewModel } from "../models/answerViewModel";
import { FormService } from "../services/form-service/form.service";
import { ActivatedRoute } from "@angular/router";
import { from, Observable, empty } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { FormBuilder, Validators } from "@angular/forms";
import { Person } from "../models/person";
import { PersonService } from "../services/person-service/person.service";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";

@Component({
  selector: "app-answer-details",
  templateUrl: "./answer-details.component.html",
  styleUrls: ["./answer-details.component.css"]
})
export class AnswerDetailsComponent implements OnInit {
  public answer$: Observable<AnswerViewModel>;
  public questions: Answer[];
  public radioQuestionID: string[] = ["1", "2"];
  public showModal: boolean;
  public person$: Observable<Person>;
  @ViewChild("notesResizableArea") notesResizableArea: CdkTextareaAutosize;
  private statusValue;
  private personId;
  private tempApplVal = null;
  private tempTestVal = null;
  private tempInterVal = null;
  private tempNotes = null;
  private email;

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
    private formService: FormService,
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
      switchMap(params => {
        return this.formService.fetchAnswer({ id: params.get("id") });
      })
    );
    this.answer$.subscribe(data => {
      console.log(data.person.extra);
      this.setExistingExtraValue(data.person.extra);
      this.updateStatus(data.person);
      this.personId = data.person.id;
      this.email = data.person.email;
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

  onSubmitAcceptance() {
    this.acceptanceForm.markAllAsTouched();
    this.statusValue = null;
    console.log(this.state.value);
    if (this.state.value === "yes") {
      this.statusValue = "Priimta";
    } else if (this.state.value === "no") {
      this.statusValue = "Atmesta";
    }
    window.location.href = this.getEmailOpenString(this.email);
    this.formService.patchPerson({
      id: this.personId,
      extra: { status: this.statusValue }
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
}
