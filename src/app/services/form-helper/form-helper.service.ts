import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validator } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class FormHelperService {

  constructor(private fb: FormBuilder) { }
  agsds = this.fb.group({});
  

  public buildApplicationForm(){
    return this.fb.group({});
  }
  
}
