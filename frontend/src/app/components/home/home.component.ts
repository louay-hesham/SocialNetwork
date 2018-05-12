import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CommonService } from '../../services/common.service'
import { ApiService } from '../../services/api.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private window: number = 0;
  private requestsCount: number = 0;

  constructor(private cookie: CookieService, private common: CommonService, private api: ApiService) { }

  ngOnInit() {
    this.api.getRequestsCount(this.common.user.email).subscribe(
      response => {
        if (response['status'] == 'success') {
          this.requestsCount = response['data'];
        }
      }
    )
  }

  private logout() {
    this.cookie.delete('email');
    this.cookie.delete('password');
    window.location.reload();
  }

  private setWindow(n: number) {
    this.window = n;
  }
}
