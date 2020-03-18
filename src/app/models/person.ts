export class Person {
  constructor(fname: string, lname: string, phone: string, email: string, establishment: string) {
    this.email = email;
    this.name = fname;
    this.phone = phone;
    this.surname = lname;
    this.uni = establishment;
  }

  name: string;
  surname: string;
  phone: string;
  email: string;
  uni: string;
}
