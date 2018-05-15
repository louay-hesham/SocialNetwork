import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonService } from '../../../services/common.service'
import { ApiService } from '../../../services/api.service'
import { User } from '../../../classes/user'
import { Post } from '../../../classes/post'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private user: User;
  private posts: Post[];
  private friendshipStatus: string;

  @Output()
  public ready: EventEmitter<ProfileComponent> = new EventEmitter<ProfileComponent>();

  constructor(private common: CommonService, private api: ApiService) { }

  ngOnInit() {
    this.ready.emit(this);
  }

  private sendRequest() {
    this.api.sendFriendRequest(this.common.user.email, this.user.email).subscribe(
      response => {
        if (response['status'] == 'success') {
          this.user = this.common.parseUser(response['data']['userData'])
          this.posts = [];
          for(let postData of response['data']['posts']) {
            this.posts.push(this.common.parsePost(postData))
          }
          this.friendshipStatus = response['data']['friendshipStatus']
        }
      }
    )
  }

  private acceptRequest() {
    this.api.acceptFriendRequest(this.common.user.email, this.user.email, true).subscribe(
      response => {
        if (response['status'] == 'success') {
          this.user = this.common.parseUser(response['data']['userData'])
          this.posts = [];
          for(let postData of response['data']['posts']) {
            this.posts.push(this.common.parsePost(postData))
          }
          this.friendshipStatus = response['data']['friendshipStatus']
          this.common.refreshRequestsCount();
        }
      }
    )
  }

  public setData(data: any) {
    this.user = data['user'];
    this.posts = data['posts'];
    this.friendshipStatus = data['friendshipStatus'];
  }

}
