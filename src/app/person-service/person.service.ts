import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Answer} from '../shared/answer(test)';
import {AnswerPerson} from '../models/answer-person';

@Injectable({
  providedIn: 'root',
})
export class FormService {

  private answersUrl: string;


  constructor(private http: HttpClient) {
    this.answersUrl = 'http://ita-5-bakc-staging.herokuapp.com/api/answer';
  }

  public findAllAnswers(): Observable<Answer[]> {
    return this.http.get<Answer[]>(this.answersUrl);
  }

  public saveAnswer(answer: Answer) {
    return this.http.post<Answer>(this.answersUrl, answer);
  }

  public saveForm(form: AnswerPerson) {
    return this.http.post<AnswerPerson>(this.answersUrl
      , JSON.stringify(form)
      , {headers: new HttpHeaders({'Content-Type': 'application/json'})})
      .subscribe(
        data => console.log(data)
      );
  }

}
