import { Component, OnInit } from '@angular/core';
import { Form } from "../models/form";

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent implements OnInit {
  applicationForm: Form;
  constructor() { }

  ngOnInit(): void {
  }

}
