import { Component, OnInit } from '@angular/core';
import { Answer } from '../shared/answer(test)';
import { FormService } from '../form-service/form.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css'],
  providers: [FormService]
})
export class AnswerListComponent implements OnInit {

  answers: Answer[];

   constructor(private formService: FormService) { }

  ngOnInit(): void {
    this.formService.findAllAnswers().subscribe(data =>{
      this.answers = data;
    })
  }

}
