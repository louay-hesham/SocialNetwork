import { Component } from '@angular/core';
import { CommonService } from '../services/common.service'
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private common: CommonService, private cookie: CookieService, private api: ApiService) { }

  ngOnInit() {
    // if (this.cookie.check('username') && this.cookie.check('password')) {
    //   let username = this.cookie.get('username');
    //   let password = this.cookie.get('password')
    //   this.api.hashedLogin(username, password).subscribe(
    //     response => {
    //       if (response['status'] == 'success') {
    //         this.common.parseUser(response['data'])
    //       } else {
    //         this.common.makeErrorMessage('Could not login', response['error_message'])
    //       }
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   )
    // }
  }

  private loggedIn(): boolean {
    return this.common.user != undefined;
  }

  private logout() {
    this.cookie.delete('email');
    this.cookie.delete('password');
    window.location.reload();
  }
}
