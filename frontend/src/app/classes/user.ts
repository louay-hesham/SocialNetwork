import * as crypto from 'crypto-js';

export class User {

  public firstName: string;
  public lastName: string;
  public nickname: string = '';
  public password: string;
  public phone: string = '';
  public email: string;
  public gender: boolean;
  public birthdate: Date;
  public profilePic: any;
  public hometown: string = '';
  public maritalStatus: number = -1;
  public aboutMe: string = '';


  constructor () { }
  
  public toJSON(): any {
    let hashedPwd = crypto.SHA256(this.password)
    return {
      'firstName': this.firstName,
      'lastName': this.lastName,
      'nickname': this.nickname,
      'password': hashedPwd,
      'phone': this.phone,
      'email': this.email,
      'gender': this.gender,
      'birthdate': this.birthdate,
      'profilePic': this.profilePic,
      'hometown': this.hometown,
      'maritalStatus': this.maritalStatus,
      'aboutMe': this.aboutMe
    }
  }

  public toJSON_noEcryption(): any {
    return {
      'firstName': this.firstName,
      'lastName': this.lastName,
      'nickname': this.nickname,
      'password': this.password,
      'phone': this.phone,
      'email': this.email,
      'gender': this.gender,
      'birthdate': this.birthdate,
      'profilePic': this.profilePic,
      'hometown': this.hometown,
      'maritalStatus': this.maritalStatus,
      'aboutMe': this.aboutMe
    }
  }

  public getDisplayName(): string {
    if (this.nickname == undefined || this.nickname == '') {
      return this.firstName + ' ' + this.lastName;
    } else {
      return this.nickname;
    }
  }
}
