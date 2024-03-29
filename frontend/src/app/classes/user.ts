import * as crypto from 'crypto-js';

export class User {

  public firstName: string;
  public lastName: string;
  public nickname: string = '';
  public password: string;
  public phone: string = '';
  public email: string;
  public gender: boolean;
  public birthdate: string;
  public profilePic: any;
  public hometown: string = '';
  public maritalStatus: number = -1;
  public aboutMe: string = '';


  constructor () { }
  
  public toJSON(): any {
    let data = {
      'firstName': this.firstName,
      'lastName': this.lastName,
      'nickname': this.nickname,
      'phone': this.phone,
      'email': this.email,
      'gender': this.gender,
      'birthdate': this.birthdate,
      'profilePic': this.profilePic,
      'hometown': this.hometown,
      'maritalStatus': this.maritalStatus,
      'aboutMe': this.aboutMe
    }
    if (this.password != undefined && this.password != '') {
      let hashedPwd = crypto.SHA256(this.password);
      data['password']= hashedPwd;
    }
    
    return data;
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
    let displayName = this.firstName + ' ' + this.lastName;
    if (this.nickname != undefined && this.nickname != '') {
      displayName = displayName + ' (' + this.nickname + ')'; 
    }
    return displayName;
  }

  public getProfilePic(): string {
    if (this.profilePic != undefined && this.profilePic != '') {
      return 'data:image/png;base64,' + this.profilePic;
    } else if (this.gender) {
      return '/assets/male.jpg';
    } else {
      return '/assets/female.jpg';
    }
  }

  public getGenderText(): string {
    if (this.gender) return 'Male';
    else return 'Female';
  }

  public getMaritalStatusText(): string {
    if (this.maritalStatus == 0) return 'Single';
    else if (this.maritalStatus == 1) return 'Engaged';
    else if (this.maritalStatus == 2) return 'Married';
    else return '';
  }

  public isAvailableForUser() : boolean {
    if (this.birthdate == undefined || this.birthdate == null) return false;
    else return true;
  }
}
