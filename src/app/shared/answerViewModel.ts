export class AnswerViewModel {
  person: {
    id: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    uni: string;
    extra: {
      dateTime: Date;
      notes: string;
      applicationValuation: string;
      testValuation: string;
      interviewValuation: string;
      status: string;
    };
  };
  answerList: string[];
}
