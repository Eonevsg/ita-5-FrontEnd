import {Component, OnInit} from '@angular/core';
import {Answer} from '../models/answer';
import {AnswerView} from '../models/answerView';
import {ApplicationFormService} from '../services/application-form-service/form.service';
import {ActivatedRoute} from '@angular/router';
import {from, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {FormBuilder, Validators} from '@angular/forms';
import {Person} from '../models/person';
import {LanguageService} from '../services/language-service/language.service';

@Component({
  selector: 'app-answer-details',
  templateUrl: './answer-details.component.html',
  styleUrls: ['./answer-details.component.css'],
})
export class AnswerDetailsComponent implements OnInit {

  public answer$: Observable<AnswerView>;
  public persons: Person[] = [];
  public sortedPersons: Person[];
  public applicationIDs: number[] = [];
  public questions: Answer[];
  public radioQuestionID: string[] = ['1', '2'];
  public showModal: boolean;
  private statusValue: string;
  private personId: string;
  private tempApplVal: string = null;
  private tempTestVal: string = null;
  private tempInterVal: string = null;
  private tempNotes: string = null;
  private email: string;
  private phone: string;
  private status: string;

  public message: string;
  public buttonValue: string;
  public buttonFunction: string;

  private routeId: number;

  applicationValues: any[] = [
    {id: 1, value: '1'},
    {id: 2, value: '2'},
    {id: 3, value: '3'},
  ];
  testValues: any[] = [
    {id: 1, value: '1'},
    {id: 2, value: '2'},
    {id: 3, value: '3'},
    {id: 4, value: '4'},
    {id: 5, value: '5'},
    {id: 6, value: '6'},
    {id: 7, value: '7'},
    {id: 8, value: '8'},
    {id: 9, value: '9'},
    {id: 10, value: '10'},
  ];
  interviewValues: any[] = [
    {id: 1, value: '1'},
    {id: 2, value: '2'},
    {id: 3, value: '3'},
  ];

  constructor(
    private formService: ApplicationFormService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private languageService: LanguageService
  ) {
  }

  valuationForm = this.fb.group({
    applicationValuation: ['', []],
    testValuation: ['', []],
    interviewValuation: ['', []],
    notes: ['', [Validators.maxLength(1000)]],
  });
  acceptanceForm = this.fb.group({
    state: ['', []],
  });

  getNextApplicationId() {
    for (let i = 0; i < this.applicationIDs.length; i++) {
      if (
        this.routeId == this.applicationIDs[i] &&
        this.applicationIDs[i + 1] != undefined
      ) {
        return this.applicationIDs[i + 1];
      }
    }
    return this.routeId;
  }

  getPrevApplicationId() {
    for (let i = 0; i < this.applicationIDs.length; i++) {
      if (
        this.routeId == this.applicationIDs[i] &&
        this.applicationIDs[i - 1] != undefined
      ) {
        return this.applicationIDs[i - 1];
      }
    }
    return this.routeId;
  }

  getPersonStatus() {
    return this.extractPersonStatus(this.status);
  }

  private extractPersonStatus(status: string) {
    if (this.languageService.getLanguage() === 'lt') {
      switch (status) {
        case 'Testas': {
          return 'Testas išsiųstas';
        }
        case 'Nauja': {
          return 'Nauja paraiška';
        }
        case 'Perskaityta': {
          return 'Paraiška perskaityta';
        }
        case 'Interviu': {
          return 'Pakviestas interviu';
        }
        case 'Atmesta': {
          return 'Paraiška atmesta';
        }
        case 'Priimta': {
          return 'Paraiška priimta';
        }
        case 'Atsisakė': {
          return 'Aplikantas atsisakė';
        }
        default: {
          return status;
        }
      }
    } else if (this.languageService.getLanguage() === 'en') {
      switch (status) {
        case 'Testas': {
          return 'Test sent';
        }
        case 'Nauja': {
          return 'New application';
        }
        case 'Perskaityta': {
          return 'Read application';
        }
        case 'Interviu': {
          return 'Invited to interview';
        }
        case 'Atmesta': {
          return 'Rejected application';
        }
        case 'Priimta': {
          return 'Accepted application';
        }
        case 'Atsisakė': {
          return 'Applicant refused';
        }
        default: {
          return status;
        }
      }
    }
  }

  get applicationValuation() {
    return this.valuationForm.get('applicationValuation');
  }

  get testValuation() {
    return this.valuationForm.get('testValuation');
  }

  get interviewValuation() {
    return this.valuationForm.get('interviewValuation');
  }

  get notes() {
    return this.valuationForm.get('notes');
  }

  get state() {
    return this.acceptanceForm.get('state');
  }

  show() {
    document.getElementById('overlay').classList.add('fadeIn');
    this.showModal = true;
  }

  hide() {
    document.getElementById('overlay').classList.remove('fadeIn');
    this.showModal = false;
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      this.routeId = parseInt(params.get('id'));


      this.formService.fetchQuestions().subscribe((data) => {
        this.questions = data;
      });

      this.formService.findAllAnswers().subscribe((data) => {
        data.forEach((element) =>
          this.applicationIDs.push(parseInt(element.person.id))
        );
      });

      this.answer$ = from(this.route.paramMap).pipe(
        switchMap((params) =>
          this.formService.fetchAnswer({id: params.get('id')})
        )
      );
      this.answer$.subscribe((data) => {
        this.setExistingExtraValue(data.person.extra);
        this.updateStatus(data.person);
        this.personId = data.person.id;
        this.email = data.person.email;
        this.phone = data.person.phone;
        this.status = data.person.extra.status;
      });

    });
  }

  onSubmitValuation(): void {
    if (this.applicationValuation.value) {
      this.tempApplVal = this.applicationValuation.value;
    }
    if (this.testValuation.value) {
      this.tempTestVal = this.testValuation.value;
    }
    if (this.interviewValuation.value) {
      this.tempInterVal = this.interviewValuation.value;
    }
    if (this.notes.value) {
      this.tempNotes = this.notes.value;
    }

    this.message =
      this.languageService.getLanguage() === 'lt'
        ? 'Ar tikrai norite išsaugoti?'
        : 'Are you sure you want to save changes?';
    this.buttonValue =
      this.languageService.getLanguage() === 'lt' ? 'Išsaugoti' : 'Confirm';
    this.buttonFunction = 'onUpdateValues';
    this.show();
  }

  updateStatus(person: Person): any {
    if (person.extra.status.toLowerCase() === 'nauja') {
      return this.formService.patchPerson({
        id: person.id,
        extra: {status: 'Perskaityta'},
      });
    }
  }

  getFullQuestion(id: string): string {
    return this.questions.find((question) => question.id === id).fullQuestion;
  }

  getAnswer(str: string, qId: string) {
    if (this.radioQuestionID.includes(qId)) {
      if (str) {
        return 'Ne. ' + str;
      } else {
        return 'Taip';
      }
    } else {
      return str;
    }
  }

  changeApplicationValue(e) {
    this.applicationValuation.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeTestValue(e) {
    this.testValuation.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeInterviewValue(e) {
    this.interviewValuation.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  getEmailOpenString(email: string) {
    return `mailto:${email}?subject=IT Akademija`;
  }

  setExistingExtraValue(extra: any) {
    if (extra.applicationValuation) {
      this.valuationForm.controls.applicationValuation.setValue(
        extra.applicationValuation
      );
    }
    if (extra.testValuation) {
      this.valuationForm.controls.testValuation.setValue(extra.testValuation);
    }
    if (extra.interviewValuation) {
      this.valuationForm.controls.interviewValuation.setValue(
        extra.interviewValuation
      );
    }
    if (extra.notes) {
      this.valuationForm.controls.notes.setValue(extra.notes);
    }
  }

  sendTest() {
    this.buttonValue =
      this.languageService.getLanguage() === 'lt' ? 'Siųsti' : 'Send';
    this.message =
      this.languageService.getLanguage() === 'lt'
        ? `Nuoroda į testa bus išsiųsta el. paštu:\n ${this.email}`
        : `Test link will be sent to email:\n ${this.email}`;
    this.buttonFunction = 'onSendEmail';
    this.statusValue = 'Testas';
    this.show();
  }

  inviteToInterview() {
    this.buttonValue =
      this.languageService.getLanguage() === 'lt' ? 'Patvirtinti' : 'Confirm';
    this.message =
      this.languageService.getLanguage() === 'lt'
        ? `Su aplikantu bus susisiekta telefonu:\n ${this.phone}`
        : `The applicant will be contacted by phone:\n ${this.phone}`;
    this.buttonFunction = 'onConfirm';
    this.statusValue = 'Interviu';
    this.show();
  }

  acceptApplication() {
    this.buttonValue =
      this.languageService.getLanguage() === 'lt' ? 'Patvirtinti' : 'Confirm';
    this.message =
      this.languageService.getLanguage() === 'lt'
        ? `Su aplikantu bus susisiekta telefonu:\n ${this.phone}`
        : `The applicant will be contacted by phone:\n ${this.phone}`;
    this.buttonFunction = 'onConfirm';
    this.statusValue = 'Priimta';
    this.show();
  }

  rejectApplication() {
    this.buttonValue =
      this.languageService.getLanguage() === 'lt' ? 'Siųsti' : 'Send';
    this.message =
      this.languageService.getLanguage() === 'lt'
        ? `Neigiamas atsakymas aplikantui bus siunčiams el. paštu:\n ${this.email}`
        : `Negative response to the applicant will be sent to email:\n ${this.email}`;
    this.buttonFunction = 'onSendEmail';
    this.statusValue = 'Atmesta';

    this.show();
  }

  refused() {
    this.buttonValue =
      this.languageService.getLanguage() === 'lt' ? 'Patvirtinti' : 'Confirm';
    this.message = `Aplikantas atsisakė`;
    this.buttonFunction = 'onConfirm';
    this.statusValue = 'Atsisakė';
    this.show();
  }

  onConfirm() {
    this.formService.patchPerson({
      id: this.personId,
      extra: {status: this.statusValue},
    });
    this.hide();
  }

  onSendEmail() {
    window.location.href = this.getEmailOpenString(this.email);
    this.formService.patchPerson({
      id: this.personId,
      extra: {status: this.statusValue},
    });
    this.hide();
  }

  onUpdateValues() {
    this.formService.patchPerson({
      id: this.personId,
      extra: {
        applicationValuation: this.tempApplVal,
        testValuation: this.tempTestVal,
        interviewValuation: this.tempInterVal,
        notes: this.tempNotes,
      },
    });
    this.hide();
  }
}
