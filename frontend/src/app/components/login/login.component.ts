import { Component, OnInit } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { User } from '../../classes/user'
import { CommonService } from '../../services/common.service'
import { ApiService } from '../../services/api.service'

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

  constructor(private common: CommonService, private api: ApiService) { }

  ngOnInit() { }

  private login() {
    this.api.login(this.loginEmail, this.loginPassword).subscribe(
      response => {
        if (response['status'] == 'success') {
          this.common.makeSuccessMessage('Login successful')
          this.common.parseUser(response['data'])
        } else {
          this.common.makeErrorMessage('Could not login', response['error_message'])
        }
      }
    )
  }

  private register() {
    if (!this.validateEmail() || this.user.email == undefined) {
      this.common.makeErrorMessage('Invalid data', 'Please enter a valid email');
    } else if (!this.checkPassword()) {
      this.common.makeErrorMessage('Invalid data', 'Passwords do not match');
    } else if (this.user.firstName == undefined) {
      this.common.makeErrorMessage('Incomplete data', 'Please enter your first name');
    } else if (this.user.lastName == undefined) {
      this.common.makeErrorMessage('Incomplete data', 'Please enter your last name');
    } else if (this.user.password == undefined) {
      this.common.makeErrorMessage('Incomplete data', 'Please enter a password');
    } else if (this.user.gender == undefined) {
      this.common.makeErrorMessage('Incomplete data', 'Please select your gender');
    } else if (this.model == undefined) {
      this.common.makeErrorMessage('Incomplete data', 'Please choose date of birth');
    } else {
      this.user.birthdate = this.model.jsdate;
      this.api.registerUser(this.user.toJSON()).subscribe(
        response => {
          if (response['status'] == 'success') {
            this.common.makeSuccessMessage('Registeration successfull');
            this.common.parseUser(response['data'])
          } else {
            this.common.makeErrorMessage('Error while registeration', response['error_message']);
          }
        }
      )
    }
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
    if (this.user.maritalStatus == -1) return 'Marital Status';
    else if (this.user.maritalStatus == 0) return 'Single';
    else if (this.user.maritalStatus == 1) return 'Engaged';
    else if (this.user.maritalStatus == 2) return 'Married';
  }

  private chooseMarital(m: number) {
    this.user.maritalStatus = m;
  }
}
