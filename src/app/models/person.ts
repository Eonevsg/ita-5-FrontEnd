export class Person {
  id: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  uni: string;
  contract: boolean;
  extra: {
    dateTime: Date;
    notes: string;
    applicationValuation: string;
    interviewValuation: string;
    status: string;
  };
  constructor(
    id: string,
    fname: string,
    lname: string,
    phone: string,
    email: string,
    establishment: string,
    contract: boolean,
    extra: any
  ) {
    this.id = id;
    this.email = email;
    this.name = fname;
    this.phone = phone;
    this.surname = lname;
    this.uni = establishment;
    this.contract = contract;
    this.extra = extra;
  }
}
