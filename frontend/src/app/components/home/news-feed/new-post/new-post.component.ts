import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../services/common.service'
import { ApiService } from '../../../../services/api.service'
import { User } from '../../../../classes/user'
import { Post } from '../../../../classes/post'

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  private newPost: Post;

  constructor(private common: CommonService, private api: ApiService) { }

  ngOnInit() {
    this.newPost = new Post();
    this.newPost.poster = this.common.user;
  }

  onFileChanged(event: any) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = e => { 
      this.newPost.image = e.target.result.substring(23);
    }
  }

}
