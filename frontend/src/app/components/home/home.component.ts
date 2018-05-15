import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ProfileComponent } from './profile/profile.component'
import { CommonService } from '../../services/common.service'
import { ApiService } from '../../services/api.service'
import { User } from '../../classes/user'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private window: number = 0;
  private requestsCount: number = 0;

  private profileComponent: ProfileComponent;
  private dataForProfile: any;

  constructor(private cookie: CookieService, private common: CommonService, private api: ApiService) { }

  ngOnInit() {
    this.common.refreshRequestsCount()
  }

  private logout() {
    this.cookie.delete('email');
    this.cookie.delete('password');
    window.location.reload();
  }

  private setWindow(n: number) {
    this.window = n;
    if (n != 5) {
      this.profileComponent = undefined;
    }
  }

  private showProfile(user: User) {
    this.dataForProfile = {};
    this.api.getProfileData(this.common.user.email, user.email).subscribe(
      response => {
        if (response['status'] == 'success') {
          let user = this.common.parseUser(response['data']['userData'])
          let posts = [];
          for(let postData of response['data']['posts']) {
            posts.push(this.common.parsePost(postData))
          }
          this.dataForProfile = {
            'user': user,
            'posts': posts
          }
          this.window = 5;
          if (this.profileComponent != undefined) {
            this.profileComponent.setData(this.dataForProfile);        
          }
        }
      }
    )
  }

  private profileComponentReady(profileComponent: ProfileComponent) {
    profileComponent.setData(this.dataForProfile);
    this.profileComponent = profileComponent;
  }
}
