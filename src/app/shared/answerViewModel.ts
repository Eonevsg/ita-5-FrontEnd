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
      interviewValuation: string;
      status: string;
    };
  };
  answerList: string[];
}
