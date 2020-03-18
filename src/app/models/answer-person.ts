import {Person} from './person';
import {Answer} from './answer';

export class AnswerPerson {
  constructor(tempAnswerList: Answer[], tempPerson: Person) {
    this.person = tempPerson;
    this.answerList = tempAnswerList;
  }

  person: Person;
  answerList: Answer[];
}
