import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AnswerViewModel } from "../../shared/answerViewModel";
import { AnswerPerson } from "../../models/answer-person";
import { Answer } from "../../models/answer";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class FormService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public fetchQuestions(): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.url}/question`);
  }

  public findAllAnswers(): Observable<AnswerViewModel[]> {
    return this.http.get<AnswerViewModel[]>(`${this.url}/answer`);
  }

  public fetchAnswer({ id }): Observable<AnswerViewModel> {
    return this.http.get<AnswerViewModel>(`${this.url}/answer/${id}`);
  }

  public patchPerson(person: { extra: { status: string }; id: string }) {
    console.log(JSON.stringify(person));
    return this.http
      .patch(`${this.url}/answer`, JSON.stringify(person), {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      })
      .subscribe(data => console.log(data));
  }

  public saveForm(form: AnswerPerson) {
    return this.http
      .post<AnswerPerson>(`${this.url}/answer`, JSON.stringify(form), {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      })
      .subscribe(data => console.log(data));
  }

  public fetchSchools(): Observable<Object> {
    return this.http.get(`${this.url}/school`);
  }
}
