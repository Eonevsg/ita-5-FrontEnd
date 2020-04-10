import { Person } from "./person";
import { Answer } from "./answer";

export class AnswerPerson {
  person: Person;
  answerList: Answer[];

  constructor(tempAnswerList: Answer[], tempPerson: Person) {
    this.person = tempPerson;
    this.answerList = tempAnswerList;
  }
}
