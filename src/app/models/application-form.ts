export interface ApplicationForm {
  id?: string;
  fname: string;
  lname: string;
  phone: number;
  email: string;
  establishment: string;
  establishmentOther: string;
  contract: boolean;
  contractExplanation?: string;
  shift: boolean;
  shiftExplanation?: string;
  hobbies: string;
  motivation: string;
  experience: string;
  marketing: string;
}
