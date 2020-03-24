import { Component, OnInit } from "@angular/core";
import { AnswerViewModel } from "../shared/answerViewModel";
import { FormService } from "../form-service/form.service";

@Component({
  selector: "app-answer-list",
  templateUrl: "./answer-list.component.html",
  styleUrls: ["./answer-list.component.css"],
  providers: [FormService]
})
export class AnswerListComponent implements OnInit {
  answers: AnswerViewModel[];
  fields: any = {name: "", surname:"", uni: ""};
  filters: any = {name: "", surname: "", uni: ""};
  
  
  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.formService.findAllAnswers().subscribe(data => {
      this.answers = data;
    });
  }
  updateFilters(): void{
    this.filters = Object.assign({}, this.fields);
      console.log(this.filters);
  }
}
