import { Injectable } from '@angular/core';
import { User } from '../classes/user'
import { CookieService } from 'ngx-cookie-service';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Injectable()
export class CommonService {

  public user: User = undefined;
  public departments: any;
  public courses: any;

  constructor(private cookie: CookieService) { }

  private saveUserCookie() {
    this.cookie.set('email', this.user.email);
    this.cookie.set('password', this.user.password);
  }

  public makeSuccessMessage(title: string, text:string = '') {
    swal({
      title: title,
      text: text,
      icon: "success",
    });
  }

  public makeErrorMessage(title: string, text: string) {
    swal({
      title: title,
      text: text,
      icon: "error",
    });
  }

  public parseUser(userData: string){
    let user = new User();
    userData = JSON.parse(userData);
    user.email = userData[0]['pk'];
    user.password = userData[0]['fields']['password'];
    user.firstName = userData[0]['fields']['firstname'];
    user.lastName = userData[0]['fields']['lastname'];
    user.nickname = userData[0]['fields']['nickname'];
    user.phone = userData[0]['fields']['phone'];
    user.gender = userData[0]['fields']['gender'];
    user.birthdate = userData[0]['fields']['birthdate'];
    user.profilePic = userData[0]['fields']['profilepic'];
    user.hometown = userData[0]['fields']['hometown'];
    user.maritalStatus = userData[0]['fields']['maritalStatus'];
    user.aboutMe = userData[0]['fields']['aboutme'];
    this.user = user;
    this.saveUserCookie();
  }
}
