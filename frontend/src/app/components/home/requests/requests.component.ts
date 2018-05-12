import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service'
import { ApiService } from '../../../services/api.service'
import { User } from '../../../classes/user'

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  private requests: User[] = [];

  constructor(private common: CommonService, private api: ApiService) { }

  ngOnInit() {
    this.api.getFriendRequests(this.common.user.email).subscribe(
      response => {
        if (response['status'] == 'success') {
          for (let userData of response['data']) {
            this.requests.push(this.common.parseUser(userData));
          }
        }
      }
    )
  }

}
