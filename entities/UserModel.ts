export class UserModel {
  token: string;
  email: string;
  fullName: string;
  phoneNumber: number;
  uid: string;

  constructor(
    token: string,
    email: string,
    fullName: string,
    phoneNumber: number,
    uid: string
  ) {
    this.token = token;
    this.email = email;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.uid = uid;
  }

  get() {
    return {
      email: this.email,
      fullName: this.fullName,
      phoneNumber: this.phoneNumber,
      uid: this.uid,
    };
  }
}
