import { Component, OnInit } from "@angular/core";
import { AnswerViewModel } from "../shared/answerViewModel";
import { FormService } from "../form-service/form.service";
import { AuthService } from "../services/auth/auth.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Sort } from "@angular/material/sort";
import { Person } from "../models/person";

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
  fields: any = { status: "", dateTime: "", name: "", surname: "", uni: "" };
  filters: any = { status: "", dateTime: "", name: "", surname: "", uni: "" };

  constructor(
    private formService: FormService,
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.formService.findAllAnswers().subscribe(data => {
      this.answers = data;
      console.log(data);
      data.forEach(element => this.persons.push(element.person));
      console.log(this.persons);
      this.sortedPersons = this.persons.slice();
    });
  }
  updateFilters(): void {
    this.filters = Object.assign({}, this.fields);
    console.log(this.filters);
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
        case "state":
          return this.compare(a.extra.status, b.extra.status, isAsc);
        case "dateTime":
          return this.compare(a.extra.dateTime, b.extra.dateTime, isAsc);
        default:
          return 0;
      }
    });
  }

  logOutButtonClick() {
    this.authService.logOut();
    this.location.replaceState("/"); // clears browser history so they can't navigate with back button
    this.router.navigate(["home"]);
  }

  compare(
    a: number | string | Date,
    b: number | string | Date,
    isAsc: boolean
  ) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
