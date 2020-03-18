import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Answer } from '../shared/answer(test)'
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: "root",
})
export class FormService {

  private answersUrl: string;


  constructor(private http: HttpClient) { 
    this.answersUrl = 'http://localhost:8080/api/answer/all';
  }

  public findAllAnswers(): Observable<Answer[]> {
    return this.http.get<Answer[]>(this.answersUrl);
  }

  public saveAnswer(answer: Answer){
    return this.http.post<Answer>(this.answersUrl, answer);
  }

  public saveForm(form: FormGroup){
    return this.http.post<FormGroup>(this.answersUrl, form);
  }

}
