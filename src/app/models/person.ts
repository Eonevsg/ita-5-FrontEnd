export class Person {
  constructor(
    id: string,
    fname: string,
    lname: string,
    phone: string,
    email: string,
    establishment: string,
    extra: any
  ) {
    this.id = id;
    this.email = email;
    this.name = fname;
    this.phone = phone;
    this.surname = lname;
    this.uni = establishment;
    this.extra = extra;
  }

  id: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  uni: string;
  extra: {
    dateTime: Date;
    notes: string;
    applicationValuation: string;
    testValuation: string;
    interviewValuation: string;
    status: string;
  };
}
