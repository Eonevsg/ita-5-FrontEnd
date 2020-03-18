import { Component, OnInit } from '@angular/core';
import { Answer } from '../shared/answer(test)';
import { FormService } from '../person-service/person.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css'],
  providers: [FormService]
})
export class AnswerListComponent implements OnInit {

  answers: Answer[];

   constructor(private personService: FormService) { }

  ngOnInit(): void {
    this.personService.findAllAnswers().subscribe(data =>{
      this.answers = data;
    })
  }

}
