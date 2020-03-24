import {Component, OnInit} from '@angular/core';
import {AnswerViewModel} from '../shared/answerViewModel';
import {FormService} from '../form-service/form.service';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css'],
  providers: [FormService]
})
export class AnswerListComponent implements OnInit {
  answers: AnswerViewModel[];

  constructor(
    private formService: FormService,
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.formService.findAllAnswers().subscribe(data => {
      this.answers = data;
    });
  }

  logOutButtonClick() {
    this.authService.logOut();
    this.location.replaceState('/'); // clears browser history so they can't navigate with back button
    this.router.navigate(['home']);
  }
}
