import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AnswerView } from "../../models/answerView";
import { AnswerPerson } from "../../models/answer-person";
import { Answer } from "../../models/answer";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class ApplicationFormService {
  private url = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public fetchQuestions(): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.url}/api/question`);
  }

  public findAllAnswers(): Observable<AnswerView[]> {
    return this.http.get<AnswerView[]>(`${this.url}/api/answer`);
  }

  public fetchAnswer({ id }): Observable<AnswerView> {
    return this.http.get<AnswerView>(`${this.url}/api/answer/${id}`);
  }

  public patchPerson(person: { extra: any; id: string }) {
    console.log(JSON.stringify(person));
    return this.http
      .patch(`${this.url}/api/answer`, JSON.stringify(person), {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      })
      .subscribe(data => console.log(data));
  }

  public saveForm(form: AnswerPerson) {
    return this.http.post<AnswerPerson>(
      `${this.url}/api/answer`,
      JSON.stringify(form),
      {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
        observe: "response"
      }
    );
  }

  public fetchSchools(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/api/school`);
  }
}
