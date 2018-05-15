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

  @Output()
  public ready: EventEmitter<ProfileComponent> = new EventEmitter<ProfileComponent>();

  constructor(private common: CommonService, private api: ApiService) { }

  ngOnInit() {
    this.ready.emit(this);
  }

  public setData(data: any) {
    this.user = data['user'];
    this.posts = data['posts'];
  }

}
