export class Person {
  constructor(
    id: string,
    fname: string,
    lname: string,
    phone: string,
    email: string,
    establishment: string
  ) {
    this.id = id;
    this.email = email;
    this.name = fname;
    this.phone = phone;
    this.surname = lname;
    this.uni = establishment;
  }
  id: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  uni: string;
}
