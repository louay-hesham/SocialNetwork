import { Component, OnInit } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { User } from '../../classes/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
  };
  private model: any;

  private loginEmail: string;
  private loginPassword: string;

  private user: User = new User();
  private emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private repeatedPassword: string;

  constructor() { }

  ngOnInit() { }

  private login() {
    console.log(this.loginEmail);
    console.log(this.loginPassword);
    // to be modified
  }

  private register() {
    this.user.birthdate = this.model.jsdate;
    console.log(this.user.toJSON());
  }

  private validateEmail(): boolean {
    return this.emailRegex.test(this.user.email) || this.user.email == undefined;
  }

  private emailClass(): string {
    let classes = 'form-control';
    if (this.validateEmail()) {
      return classes + ' ng-valid';
    } else {
      return classes + ' ng-invalid';
    }
  }

  private checkPassword(): boolean {
    return this.user.password == this.repeatedPassword;
  }

  private repPwdClass(): string {
    let classes = 'form-control';
    if (this.checkPassword()) {
      return classes + ' ng-valid';
    } else {
      return classes + ' ng-invalid';
    }
  }

  private genderText(): string {
    if (this.user.gender == undefined) return 'Gender';
    else if (this.user.gender) return 'Male';
    else return 'Female';
  }

  private chooseGender(g: boolean) {
    this.user.gender = g;
  }

  private maritalText(): string {
    if (this.user.maritalStatus == undefined) return 'Marital Status';
    else if (this.user.maritalStatus == 0) return 'Single';
    else if (this.user.maritalStatus == 1) return 'Engaged';
    else if (this.user.maritalStatus == 2) return 'Married';
  }

  private chooseMarital(m: number) {
    this.user.maritalStatus = m;
  }
}
