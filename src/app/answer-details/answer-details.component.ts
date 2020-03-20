import { Component, OnInit, Input } from "@angular/core";
import { Answer } from "../models/answer";
import { AnswerViewModel } from "../shared/answer(test)";
import { FormService } from "../form-service/form.service";
import { ActivatedRoute } from "@angular/router";
import { from, Observable } from "rxjs";
import { switchMap, tap } from "rxjs/operators";

@Component({
  selector: "app-answer-details",
  templateUrl: "./answer-details.component.html",
  styleUrls: ["./answer-details.component.css"]
})
export class AnswerDetailsComponent implements OnInit {
  public answer$: Observable<AnswerViewModel>;
  

  constructor(
    private formService: FormService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.answer$ = from(this.route.paramMap).pipe(
      switchMap(params => {
        return this.formService.fetchAnswer({ id: params.get("id") });
      })
    );
    console.log("Hello");
    this.answer$.subscribe(res => console.log(res));
    
  }
}
