import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Person } from "src/app/models/person";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class PersonService {
  constructor(private http: HttpClient) {}

  public updatePerson(person): Observable<Person> {
    return this.http.patch<Person>(environment.answersUrl, person);
  }
}
