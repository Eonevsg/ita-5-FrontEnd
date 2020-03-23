import { Component, OnInit } from '@angular/core';
import { AnswerViewModel } from '../shared/answerViewModel';
import { FormService } from '../form-service/form.service';
import { Observable } from 'rxjs';
import { AnswerPerson } from '../models/answer-person';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css'],
  providers: [FormService]
})
export class AnswerListComponent implements OnInit {

  answers: AnswerViewModel[];

   constructor(private formService: FormService) { }

  ngOnInit(): void {
    this.formService.findAllAnswers().subscribe(data =>{
      this.answers = data;
    })
  }

}
