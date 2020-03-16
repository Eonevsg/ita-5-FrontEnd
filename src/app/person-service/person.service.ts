import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Answer } from '../shared/answer(test)'

@Injectable()
export class PersonService {

  private answersUrl: string;

  constructor(private http: HttpClient) { 
    this.answersUrl = 'http://localhost:8080/api/answer';
  }

  public findAll(): Observable<Answer[]> {
    return this.http.get<Answer[]>(this.answersUrl);
  }

  public save(answer: Answer){
    return this.http.post<Answer>(this.answersUrl, answer);
  }

}
