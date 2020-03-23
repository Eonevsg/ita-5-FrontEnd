import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Answer} from '../shared/answer(test)';
import {environment} from '../../environments/environment.prod';

@Injectable({providedIn: 'root'})
export class PersonService {

  private answersUrl = environment.answersUrl;

  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<Answer[]> {
    return this.http.get<Answer[]>(this.answersUrl);
  }

  public save(answer: Answer) {
    return this.http.post<Answer>(this.answersUrl, answer);
  }

}
