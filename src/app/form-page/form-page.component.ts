import {Component, NgZone, OnInit, ViewChild} from '@angular/core';

import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Person} from '../models/person';
import {Answer} from '../models/answer';
import {AnswerPerson} from '../models/answer-person';
import {ApplicationFormService} from '../services/application-form-service/form.service';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {Observable} from 'rxjs';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent implements OnInit {
  messageTitle = 'Registracija sėkmingai išsiųsta!';
  message =
    'Atsakymą dėl dalyvavimo IT Akademijoje gausite ne vėliau nei Sausio 15d.';
  isErrorMessage: boolean;
  showModal: boolean;
  $universities: Observable<string[]>;
  applicationForm = this.buildApplicationForm();

  constructor(
    private fb: FormBuilder,
    private formService: ApplicationFormService
  ) {
  }

  ngOnInit(): void {
    subscribeToValue(this.applicationForm, 'contract', 'contractExplanation');
    subscribeToValue(this.applicationForm, 'shift', 'shiftExplanation');
    this.$universities = this.formService.fetchSchools();
    this.applicationForm.controls['establishment'].setValue(0);
  }

  onSubmit(): void {
    this.applicationForm.markAllAsTouched();
    if (this.applicationForm.valid) {
      this.saveApplicationForm(this.getPersonAndAnswers());
    }
  }

  get fname() {
    return this.applicationForm.get('fname');
  }

  get lname() {
    return this.applicationForm.get('lname');
  }

  get phone() {
    return this.applicationForm.get('phone');
  }

  get email() {
    return this.applicationForm.get('email');
  }

  get establishment() {
    return this.applicationForm.get('establishment');
  }

  get establishmentOther() {
    return this.applicationForm.get('establishmentOther');
  }

  get contract() {
    return this.applicationForm.get('contract');
  }

  get contractExplanation() {
    return this.applicationForm.get('contractExplanation');
  }

  get shift() {
    return this.applicationForm.get('shift');
  }

  get shiftExplanation() {
    return this.applicationForm.get('shiftExplanation');
  }

  get hobbies() {
    return this.applicationForm.get('hobbies');
  }

  get motivation() {
    return this.applicationForm.get('motivation');
  }

  get experience() {
    return this.applicationForm.get('experience');
  }

  get marketing() {
    return this.applicationForm.get('marketing');
  }

  get thirdPartyAgreement() {
    return this.applicationForm.get('thirdPartyAgreement');
  }

  show() {
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
    this.messageTitle = 'Registracijos forma sėkmingai išsiųsta.';
    this.message =
      'Atsakymą dėl dalyvavimo IT Akademijoje gausite ne vėliau nei Sausio 15d.';
  }

  buildApplicationForm() {
    return this.fb.group({
      fname: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
          Validators.pattern('^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ -]+$')
        ]
      ],
      lname: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
          Validators.pattern('^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ -]+$')
        ]
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^(3706|\\+3706|86)+[0-9]{7}$')
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
        ]
      ],
      establishment: ['', [Validators.required, validateSelect]],
      establishmentOther: [
        '',
        [
          requiredIfValidator(
            () => this.applicationForm.get('establishment').value
          ),
          Validators.maxLength(1000),
          Validators.pattern('^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ \\.,\\-\'"]+$')
        ]
      ],
      contract: ['', [Validators.required]],
      contractExplanation: [
        '',
        [
          requiredIfValidator(() => this.applicationForm.get('contract').value),
          Validators.maxLength(1000),
          Validators.pattern('^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ \\.,\\-\'"]+$')
        ]
      ],
      shift: ['', [Validators.required]],
      shiftExplanation: [
        '',
        [
          requiredIfValidator(() => this.applicationForm.get('shift').value),
          Validators.maxLength(1000),
          Validators.pattern('^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ \\.,\\-\'"]+$')
        ]
      ],
      hobbies: [
        '',
        [
          Validators.required,
          Validators.maxLength(1000),
          Validators.pattern('^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ \\.,\\-\'"]+$')
        ]
      ],
      motivation: [
        '',
        [
          Validators.required,
          Validators.maxLength(1000),
          Validators.pattern('^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ \\.,\\-\'"]+$')
        ]
      ],
      experience: [
        '',
        [
          Validators.required,
          Validators.maxLength(1000),
          Validators.pattern('^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ \\.,\\-\'"]+$')
        ]
      ],
      marketing: [
        '',
        [
          Validators.required,
          Validators.maxLength(1000),
          Validators.pattern('^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ \\.,\\-\'"]+$')
        ]
      ],
      thirdPartyAgreement: ['', [Validators.required]]
    });
  }

  getPersonAndAnswers(): AnswerPerson {
    this.isErrorMessage = false;
    let tempPerson: Person = null;
    let tempAnswerList: Answer[] = [];
    let establishmentValue = this.establishment.value;

    if (establishmentValue === 'kita') {
      establishmentValue = this.establishmentOther.value;
    }
    tempPerson = new Person(
      null,
      this.fname.value,
      this.lname.value,
      this.phone.value,
      this.email.value,
      establishmentValue,
      this.contract.value,
      null
    );
    tempAnswerList.push(new Answer('1', this.contractExplanation.value));
    tempAnswerList.push(new Answer('2', this.shiftExplanation.value));
    tempAnswerList.push(new Answer('3', this.hobbies.value));
    tempAnswerList.push(new Answer('4', this.motivation.value));
    tempAnswerList.push(new Answer('5', this.experience.value));
    tempAnswerList.push(new Answer('6', this.marketing.value));
    return new AnswerPerson(tempAnswerList, tempPerson);
  }

  saveApplicationForm(answerPerson: AnswerPerson) {
    this.formService.saveForm(answerPerson).subscribe(
      () => (
        (this.isErrorMessage = false),
          (this.messageTitle = 'Registracijos forma sėkmingai išsiųsta.'),
          (this.message =
            'Atsakymą dėl dalyvavimo IT Akademijoje gausite ne vėliau nei Sausio 15d.'),
          this.show()
      ),
      error => (
        (this.messageTitle = 'Klaida!'),
          (this.message = error.error),
          (this.isErrorMessage = true),
          this.show()
      )
    );
  }
}

function requiredIfValidator(predicate) {
  return formControl => {
    if (!formControl.parent) {
      return null;
    }
    if (predicate() === 'no' || predicate() === 'kita') {
      return Validators.required(formControl);
    }
    return null;
  };
}

function validateSelect(predicate: FormControl) {
  if (predicate.value == '0') {
    return {
      establishment: {
        valid: false
      }
    };
  }
  return null;
}

function subscribeToValue(applicationForm, parent, child) {
  applicationForm.get(parent).valueChanges.subscribe(value => {
    applicationForm.get(child).updateValueAndValidity();
  });
}
