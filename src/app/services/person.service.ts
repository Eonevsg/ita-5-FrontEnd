import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AnswerViewModel} from '../shared/answer(test)';

@Injectable({providedIn: 'root'})
export class PersonService {

  answersUrl: string;

  constructor(private http: HttpClient) {
    // this.answersUrl = 'http://localhost:8080/api/answer';
    this.answersUrl = 'http://ita-5-back-staging.herokuapp.com/api/answer';
  }

  public findAll(): Observable<AnswerViewModel[]> {
    return this.http.get<AnswerViewModel[]>(this.answersUrl);
  }

  public save(answer: AnswerViewModel) {
    return this.http.post<AnswerViewModel>(this.answersUrl, answer);
  }

}
