import { Component, OnInit } from '@angular/core';
import { Answer } from '../shared/answer(test)';
import { PersonService } from '../person-service/person.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css'],
  providers: [PersonService]
})
export class AnswerListComponent implements OnInit {

  answers: Answer[];

   constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.personService.findAll().subscribe(data =>{
      this.answers = data;
    })
  }

}
