import { Component, OnInit } from '@angular/core';
import { Form } from "../shared/form";

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent implements OnInit {
  form: Form;
  constructor() { }

  ngOnInit(): void {
  }

}
