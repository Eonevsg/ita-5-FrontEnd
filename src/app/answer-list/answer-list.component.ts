import { Component, OnInit, OnDestroy } from "@angular/core";
import { AnswerView } from "../models/answerView";
import { ApplicationFormService } from "../services/application-form-service/form.service";
import { Sort } from "@angular/material/sort";
import { Person } from "../models/person";

@Component({
  selector: "app-answer-list",
  templateUrl: "./answer-list.component.html",
  styleUrls: ["./answer-list.component.css"],
})
export class AnswerListComponent implements OnInit, OnDestroy {
  answers: AnswerView[];
  persons: Person[] = [];
  sortedPersons: Person[];
  filter = "{{ 'filter' | translate }}";
  fields: any = {
    status: "",
    dateTime: "",
    name: "",
    uni: "",
    contract: "",
    applicationValuation: "",
    testValuation: "",
    interviewValuation: "",
    notes: "",
  };
  filters: any = {
    status: "",
    dateTime: "",
    name: "",
    surname: "",
    uni: "",
    contract: "",
    applicationValuation: "",
    testValuation: "",
    interviewValuation: "",
    notes: "",
  };

  constructor(private formService: ApplicationFormService) {}

  ngOnInit(): void {
    document.getElementById("header").classList.add("width1200");
    document.getElementById("footer").classList.add("width1200");
    document.getElementById("main2").classList.add("width1200");

    this.formService.findAllAnswers().subscribe((data) => {
      this.answers = data;
      data.forEach((element) => this.persons.push(element.person));
      this.sortedPersons = this.persons.slice();
    });
  }
  ngOnDestroy() {
    document.getElementById("header").classList.remove("width1200");
    document.getElementById("footer").classList.remove("width1200");
    document.getElementById("main2").classList.add("width1200");
  }
  updateFilters(): void {
    this.filters = Object.assign({}, this.fields);
  }

  sortData(sort: Sort) {
    const data = this.persons.slice();
    if (!sort.active || sort.direction === "") {
      this.sortedPersons = data;
      return;
    }

    this.sortedPersons = data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active) {
        case "id":
          return this.compare(a.id, b.id, isAsc);
        case "name":
          return this.compare(a.name, b.name, isAsc);
        case "surname":
          return this.compare(a.surname, b.surname, isAsc);
        case "uni":
          return this.compare(a.uni, b.uni, isAsc);
        case "contract":
          return this.compare(a.contract, b.contract, isAsc);
        case "status":
          return this.compare(a.extra.status, b.extra.status, isAsc);
        case "dateTime":
          return this.compare(a.extra.dateTime, b.extra.dateTime, isAsc);
        case "applicationValuation":
          return this.compare(
            Number(a.extra.applicationValuation),
            Number(b.extra.applicationValuation),
            isAsc
          );
        case "interviewValuation":
          return this.compare(
            Number(a.extra.interviewValuation),
            Number(b.extra.interviewValuation),
            isAsc
          );
        case "testValuation":
          return this.compare(
            Number(a.extra.testValuation),
            Number(b.extra.testValuation),
            isAsc
          );
        case "notes":
          return this.compare(a.extra.notes, b.extra.notes, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(
    a: number | string | Date | boolean,
    b: number | string | Date | boolean,
    isAsc: boolean
  ) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  addDots(input: string): string {
    let adjustedInput = input.substring(0, 25);
    return input.length > 25 ? adjustedInput + "..." : adjustedInput;
  }
}
