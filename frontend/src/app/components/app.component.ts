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
    if (this.cookie.check('email') && this.cookie.check('password')) {
      let email = this.cookie.get('email');
      let password = this.cookie.get('password')
      this.api.hashedLogin(email, password).subscribe(
        response => {
          if (response['status'] == 'success') {
            this.common.parseLoginUser(response['data'])
          } else {
            this.common.makeErrorMessage('Could not login', response['error_message'])
          }
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  private loggedIn(): boolean {
    return this.common.user != undefined;
  }
}
