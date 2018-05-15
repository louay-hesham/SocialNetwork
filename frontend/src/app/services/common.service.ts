import { Injectable } from '@angular/core';
import { User } from '../classes/user'
import { Post } from '../classes/post'
import { ApiService } from './api.service'
import { CookieService } from 'ngx-cookie-service';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Injectable()
export class CommonService {

  public user: User = undefined;
  public departments: any;
  public courses: any;
  public requestsCount: number;

  constructor(private cookie: CookieService, private api: ApiService) { }

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

  public parseUser(userData: any): User {
    let user = new User();
    user.email = userData['email'];
    user.password = userData['password'];
    user.firstName = userData['firstname'];
    user.lastName = userData['lastname'];
    user.nickname = userData['nickname'];
    user.phone = userData['phone'];
    user.gender = userData['gender'];
    if (userData['birthdate'] == undefined || userData['birthdate'] == null) {
      user.birthdate = undefined;  
    } else {
      user.birthdate = new Date(userData['birthdate']).toDateString()
    }
    user.profilePic = userData['profilepic'];
    user.hometown = userData['hometown'];
    user.maritalStatus = userData['maritalstatus'];
    user.aboutMe = userData['aboutme'];
    return user;
  }

  public parseLoginUser(userData: any){
    this.user = this.parseUser(userData);
    this.saveUserCookie();
  }

  public refreshRequestsCount() {
    this.api.getRequestsCount(this.user.email).subscribe(
      response => {
        if (response['status'] == 'success') {
          this.requestsCount = response['data'];
        }
      }
    )
  }

  public parsePost(postData: any): Post {
    let post = new Post();
    post.id = postData['id']
    post.caption = postData['caption']
    post.image = postData['image']
    post.time = postData['time']
    post.poster = this.parseUser(postData['poster'])
    return post;
  }
}
