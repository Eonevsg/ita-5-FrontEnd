import { Component, OnInit, Input } from "@angular/core";
import { Answer } from "../models/answer";
import { AnswerViewModel } from "../shared/answerViewModel";
import { FormService } from "../form-service/form.service";
import { ActivatedRoute } from "@angular/router";
import { from, Observable, empty } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-answer-details",
  templateUrl: "./answer-details.component.html",
  styleUrls: ["./answer-details.component.css"]
})
export class AnswerDetailsComponent implements OnInit {
  public answer$: Observable<AnswerViewModel>;
  public questions: Answer[];

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}
  valuationForm = this.fb.group({
    valuation: [
      "",
      [Validators.required, Validators.min(0), Validators.max(100)]
    ],
    notes: ["", [Validators.required,
      Validators.maxLength(250)]]
  });
  get valuation() {
    return this.valuationForm.get('valuation');
  }
  get notes() {
    return this.valuationForm.get('notes');
  }

  ngOnInit(): void {
    this.formService.fetchQuestions().subscribe(data => {
      this.questions = data;
      console.log(this.questions);
    });

    this.answer$ = from(this.route.paramMap).pipe(
      switchMap(params => {
        return this.formService.fetchAnswer({ id: params.get("id") });
      })
    );

    console.log("Hello");
    this.answer$.subscribe(res => console.log(res));
  }
  onSubmit() {}

  getFullQuestion(id: string): string {
    for (let index = 0; index < this.questions.length; index++) {
      if (this.questions[index].id == id) {
        return this.questions[index].fullQuestion;
      }
    }
  }
  getAnswer(str: string, qId: string) {
    if (qId == "1" || qId == "2") {
      if (str) return "Ne. " + str;
      else return "Taip";
    } else return str;
  }
}
