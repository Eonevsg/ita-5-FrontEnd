export class Answer {
  constructor(id: string, answer: string) {
    this.questionId = id;
    this.answer = answer;
  }

  questionId: string;
  answer?: string;

  //TODO refactoring needed
  id: string;
  fullQuestion: string;
  enFullQuestion: string;
  shortQuestion: string;
}
