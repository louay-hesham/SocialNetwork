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

  onFileChanged(event: any) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = e => { 
      this.modifiedUser.profilePic = e.target.result.substring(23);
    }
  }

  private save() {
    if (this.oldPassword == undefined || this.oldPassword == '') {
      this.common.makeErrorMessage('Failed to update user info', 'Please enter your password to confirm your identity.');
    } if (this.modifiedUser.password != undefined && this.modifiedUser.password != '' && !this.checkPassword()) {
      this.common.makeErrorMessage('Failed to update user info', 'New passwords don\'t match.');
    } else {
      this.api.updateProfile(this.common.user.email, this.oldPassword, this.modifiedUser.toJSON()).subscribe(
        response => {
          if (response['status'] == 'success') {
            this.common.makeSuccessMessage('Successfully updated info');
            this.common.parseLoginUser(response['data'])
          } else {
            this.common.makeErrorMessage('Failed to update user info', response['error_message']);
          }
        }
      )
    }
  }
}
