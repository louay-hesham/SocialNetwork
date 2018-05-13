import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service'
import { ApiService } from '../../../services/api.service'
import { User } from '../../../classes/user'
import { Post } from '../../../classes/post'

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {

  private posts: Post[];

  constructor(private common: CommonService, private api: ApiService) { }

  ngOnInit() {
    this.posts = []
    this.api.getAllPosts(this.common.user.email).subscribe(
      response => {
        if (response['status'] == 'success') {
          for (let p of response['data']) {
            this.posts.push(this.common.parsePost(p))
          }
          console.log(this.posts);
        }
      }
    )
  }

}
