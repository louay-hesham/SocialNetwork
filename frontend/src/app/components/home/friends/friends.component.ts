import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonService } from '../../../services/common.service'
import { ApiService } from '../../../services/api.service'
import { User } from '../../../classes/user'

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  private friends: User[] = [];

  @Output()
  public userClicked: EventEmitter<User> = new EventEmitter<User>();

  constructor(private common: CommonService, private api: ApiService) { }

  ngOnInit() {
    this.api.getFriends(this.common.user.email).subscribe(
      response => {
        if (response['status'] == 'success') {
          for (let userData of response['data']) {
            this.friends.push(this.common.parseUser(userData));
          }
        }
      }
    )
  }

  private viewProfile(user: User) {
    this.userClicked.emit(user);
  }

}
