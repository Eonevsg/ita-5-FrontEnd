export class Answer {
  constructor(s: string, value: any) {
    this.questionId = s;
    this.answer = value;
  }

  questionId: string;
  answer?: string;

  //TODO refactoring needed
  id: string;
  fullQuestion: string;
  shortQuestion: string;
}
