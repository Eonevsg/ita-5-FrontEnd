import { Component, OnInit } from "@angular/core";
import { AnswerViewModel } from "../shared/answerViewModel";
import { FormService } from "../form-service/form.service";
import { Sort } from '@angular/material/sort';
import {Person} from '../models/person';

@Component({
  selector: "app-answer-list",
  templateUrl: "./answer-list.component.html",
  styleUrls: ["./answer-list.component.css"],
  providers: [FormService]
})
export class AnswerListComponent implements OnInit {
  answers: AnswerViewModel[];
  persons: Person[] = [];
  sortedPersons: Person[];
  fields: any = {name: "", surname: "", uni: ""};
  filters: any = {name: "", surname: "", uni: ""};


  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.formService.findAllAnswers().subscribe(data => {
      this.answers = data;
      data.forEach(element => this.persons.push(element.person));
      console.log(this.persons);
      this.sortedPersons = this.persons.slice();
    });
  }
  updateFilters(): void{
    this.filters = Object.assign({}, this.fields);
      console.log(this.filters);
  }

  sortData(sort: Sort) {
    const data = this.persons.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedPersons = data;
      return;
    }

    this.sortedPersons = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return this.compare(a.id, b.id, isAsc);
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'surname': return this.compare(a.surname, b.surname, isAsc);
        case 'uni': return this.compare(a.uni, b.uni, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
