import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AnswerViewModel } from "../shared/answerViewModel";
import { AnswerPerson } from "../models/answer-person";
import { Answer } from "../models/answer";

@Injectable({
  providedIn: "root"
})
export class FormService {
  private readonly apiPath = "/api";

  constructor(private http: HttpClient) {}

  public fetchQuestions(): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.apiPath}/question`);
  }

  public findAllAnswers(): Observable<AnswerViewModel[]> {
    return this.http.get<AnswerViewModel[]>(`${this.apiPath}/answer`);
  }

  // public saveAnswer(answer: AnswerViewModel) {
  //   return this.http.post<AnswerViewModel>(this.answersUrl, answer);
  // }

  public fetchAnswer({ id }): Observable<AnswerViewModel> {
    return this.http.get<AnswerViewModel>(`${this.apiPath}/answer/${id}`);
  }

  public saveForm(form: AnswerPerson) {
    return this.http
      .post<AnswerPerson>(`${this.apiPath}/answer`, JSON.stringify(form), {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      })
      .subscribe(data => console.log(data));
  }
}
