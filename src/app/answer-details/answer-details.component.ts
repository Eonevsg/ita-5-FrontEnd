import { Component, OnInit, Input } from "@angular/core";
import { Answer } from "../models/answer";
import { AnswerViewModel } from "../shared/answerViewModel";
import { FormService } from "../services/form-service/form.service";
import { ActivatedRoute } from "@angular/router";
import { from, Observable, empty } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { FormBuilder, Validators } from "@angular/forms";
import { Person } from "../models/person";
import { PersonService } from "../services/person-service/person.service";

@Component({
  selector: "app-answer-details",
  templateUrl: "./answer-details.component.html",
  styleUrls: ["./answer-details.component.css"]
})
export class AnswerDetailsComponent implements OnInit {
  public answer$: Observable<AnswerViewModel>;
  public questions: Answer[];
  public radioQuestionID: string[] = ["1", "2"];

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private personService: PersonService
  ) {}

  valuationForm = this.fb.group({
    applicationValuation: [
      "",
      [
        Validators.min(0),
        Validators.max(100),
        Validators.pattern("^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ0-9 \\.,\\-'\"]+$")
      ]
    ],
    interviewValuation: [
      "",
      [
        Validators.min(0),
        Validators.max(100),
        Validators.pattern("^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ0-9 \\.,\\-'\"]+$")
      ]
    ],
    notes: ["", [Validators.maxLength(450)]],
    state: ["", []]
  });

  get applicationValuation() {
    return this.valuationForm.get("applicationValuation");
  }

  get interviewValuation() {
    return this.valuationForm.get("interviewValuation");
  }

  get notes() {
    return this.valuationForm.get("notes");
  }

  get state() {
    return this.valuationForm.get("state");
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
    this.answer$.subscribe(data => this.updateStatus(data.person));
  }
  person$: Observable<Person>;

  private statusValue;

  onSubmit(): void {
    this.valuationForm.markAllAsTouched();

    this.statusValue = null;
    if (this.state.value === "yes") {
      this.statusValue = "Priimta";
    } else if (this.state.value === "no") {
      this.statusValue = "Atmesta";
    }

    this.personService.updatePerson({
      id: this.answer$.subscribe(data => data.person.id),
      extra: {
        applicationValuation: this.applicationValuation.value,
        interviewValuation: this.interviewValuation.value,
        notes: this.notes.value,
        status: this.statusValue
      }
    });
    // this.formService.saveForm(this.answerPerson);
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
}
