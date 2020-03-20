import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AnswerViewModel } from "../shared/answer(test)";
import { AnswerPerson } from "../models/answer-person";

@Injectable({
  providedIn: "root"
})
export class FormService {
  private readonly apiPath = "/api";
  private answersUrl: string;

  constructor(private http: HttpClient) {
    this.answersUrl = "https://ita-5-back-staging.herokuapp.com/api/answer";
  }

  public findAllAnswers(): Observable<AnswerViewModel[]> {
    return this.http.get<AnswerViewModel[]>(this.answersUrl);
  }

  // public saveAnswer(answer: AnswerViewModel) {
  //   return this.http.post<AnswerViewModel>(this.answersUrl, answer);
  // }
  public fetchAnswer({ id }): Observable<AnswerViewModel> {
    return this.http.get<AnswerViewModel>(`${this.apiPath}/answer/${id}`);
  }

  public saveForm(form: AnswerPerson) {
    return this.http
      .post<AnswerPerson>(this.answersUrl, JSON.stringify(form), {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      })
      .subscribe(data => console.log(data));
  }
}
