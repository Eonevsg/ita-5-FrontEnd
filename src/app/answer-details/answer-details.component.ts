import { Component, OnInit, Input } from "@angular/core";
import { Answer } from "../models/answer";
import { AnswerViewModel } from "../shared/answerViewModel";
import { FormService } from "../form-service/form.service";
import { ActivatedRoute } from "@angular/router";
import { from, Observable, empty } from "rxjs";
import { switchMap, tap } from "rxjs/operators";

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
    private route: ActivatedRoute
  ) {}

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
