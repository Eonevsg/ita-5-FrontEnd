import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {Form} from '../models/form';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

import {Person} from '../models/person';
import {Answer} from '../models/answer';
import {AnswerPerson} from '../models/answer-person';
import {FormService} from '../services/form-service/form.service';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent implements OnInit {
  message = '';
  isErrorMessage = false;
  form: Form;
  showModal: boolean;
  tempPerson: Person;
  tempAnswerList: Answer[];
  answerPerson: AnswerPerson;
  $universities;

  @ViewChild('contractResizableArea')
  contractResizableArea: CdkTextareaAutosize;
  @ViewChild('shiftResizableArea') shiftResizableArea: CdkTextareaAutosize;
  @ViewChild('hobbiesResizableArea') hobbiesResizableArea: CdkTextareaAutosize;
  @ViewChild('experienceResizableArea')
  experienceResizableArea: CdkTextareaAutosize;
  @ViewChild('marketingResizableArea')
  marketingResizableArea: CdkTextareaAutosize;
  @ViewChild('motivationResizableArea')
  motivationResizableArea: CdkTextareaAutosize;

  applicationForm = this.fb.group({
    fname: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        Validators.pattern('^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ -]+$')
      ]
    ],
    lname: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        Validators.pattern('^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ -]+$')
      ]
    ],
    phone: [
      '',
      [Validators.required, Validators.pattern('^(3706|\\+3706|86)+[0-9]{7}$')]
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
        Validators.maxLength(150),
        Validators.pattern('^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ \\.,\\-\'"]+$')
      ]
    ],
    contract: ['', [Validators.required]],
    contractExplanation: [
      '',
      [
        requiredIfValidator(() => this.applicationForm.get('contract').value),
        Validators.maxLength(250),
        Validators.pattern('^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ \\.,\\-\'"]+$')
      ]
    ],
    shift: ['', [Validators.required]],
    shiftExplanation: [
      '',
      [
        requiredIfValidator(() => this.applicationForm.get('shift').value),
        Validators.maxLength(250),
        Validators.pattern('^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ \\.,\\-\'"]+$')
      ]
    ],
    hobbies: [
      '',
      [
        Validators.required,
        Validators.maxLength(450),
        Validators.pattern('^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ \\.,\\-\'"]+$')
      ]
    ],
    motivation: [
      '',
      [
        Validators.required,
        Validators.maxLength(450),
        Validators.pattern('^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ \\.,\\-\'"]+$')
      ]
    ],
    experience: [
      '',
      [
        Validators.required,
        Validators.maxLength(450),
        Validators.pattern('^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ \\.,\\-\'"]+$')
      ]
    ],
    marketing: [
      '',
      [
        Validators.required,
        Validators.maxLength(250),
        Validators.pattern('^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ \\.,\\-\'"]+$')
      ]
    ]
  });

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private ngZone: NgZone
  ) {
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(10)).subscribe(() => {
      this.contractResizableArea.resizeToFitContent(true);
      this.shiftResizableArea.resizeToFitContent(true);
      this.hobbiesResizableArea.resizeToFitContent(true);
      this.experienceResizableArea.resizeToFitContent(true);
      this.marketingResizableArea.resizeToFitContent(true);
      this.motivationResizableArea.resizeToFitContent(true);
    });
  }

  ngOnInit(): void {
    subscribeToValue(this.applicationForm, 'contract', 'contractExplanation');
    subscribeToValue(this.applicationForm, 'shift', 'shiftExplanation');
    this.$universities = this.formService.fetchSchools();
    this.applicationForm.controls['establishment'].setValue(0);
  }

  onSubmit(): void {
    this.isErrorMessage = false;
    this.applicationForm.markAllAsTouched();
    this.tempPerson = null;
    this.tempAnswerList = [];
    this.answerPerson = null;
    let establishmentValue = this.establishment.value;
    if (establishmentValue === 'kita') {
      establishmentValue = this.establishmentOther.value;
    }
    this.tempPerson = new Person(
      null,
      this.fname.value,
      this.lname.value,
      this.phone.value,
      this.email.value,
      establishmentValue,
      null
    );
    this.tempAnswerList.push(new Answer('1', this.contractExplanation.value));
    this.tempAnswerList.push(new Answer('2', this.shiftExplanation.value));
    this.tempAnswerList.push(new Answer('3', this.hobbies.value));
    this.tempAnswerList.push(new Answer('4', this.motivation.value));
    this.tempAnswerList.push(new Answer('5', this.experience.value));
    this.tempAnswerList.push(new Answer('6', this.marketing.value));
    this.answerPerson = new AnswerPerson(this.tempAnswerList, this.tempPerson);

    this.formService.saveForm(this.answerPerson).subscribe(
      () => (this.isErrorMessage = false, this.message = 'Registracijos forma sėkmingai išsiųsta.', this.show()),
      error => (this.message = error.error, this.isErrorMessage = true, this.show())
    );
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

  show() {
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
    this.message = 'Registracijos forma sėkmingai išsiųsta.';
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
