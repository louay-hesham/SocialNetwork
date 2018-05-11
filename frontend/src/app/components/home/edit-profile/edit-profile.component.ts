import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service'
import { ApiService } from '../../../services/api.service'
import { User } from '../../../classes/user'

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  private emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private modifiedUser: User = Object.create(this.common.user);
  private oldPassword: string;
  private repeatedPassword: string;

  constructor(private common: CommonService, private api: ApiService) { }

  ngOnInit() {
    this.modifiedUser.password = undefined;
  }

  private validateEmail(): boolean {
    return this.emailRegex.test(this.modifiedUser.email) || this.modifiedUser.email == undefined;
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
    return this.modifiedUser.password == this.repeatedPassword;
  }

  private repPwdClass(): string {
    let classes = 'form-control';
    if (this.checkPassword()) {
      return classes + ' ng-valid';
    } else {
      return classes + ' ng-invalid';
    }
  }

  private maritalText(): string {
    if (this.modifiedUser.maritalStatus == -1) return 'Marital Status';
    else if (this.modifiedUser.maritalStatus == 0) return 'Single';
    else if (this.modifiedUser.maritalStatus == 1) return 'Engaged';
    else if (this.modifiedUser.maritalStatus == 2) return 'Married';
  }

  private chooseMarital(m: number) {
    this.modifiedUser.maritalStatus = m;
  }

  private save() {
    console.log(this.modifiedUser.toJSON_noEcryption())
  }

}
