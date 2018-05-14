import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  @Output()
  public publishClick: EventEmitter<boolean> = new EventEmitter<boolean>();

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

  private publish() {
    if (this.newPost.caption == undefined || this.newPost.caption == '') {
      this.common.makeErrorMessage('Failed to publish post!', 'Please write a caption.');
    } else {
      this.api.publishPost(this.common.user.email, this.newPost).subscribe(
        response => {
          console.log(response);
          this.newPost = new Post();
          this.common.makeSuccessMessage('Post published successfully')
          this.publishClick.emit(true);
        }
      )
    }
  }

  private publicText(): string {
    if (this.newPost.isPublic) {
      return 'Public';
    } else {
      return 'Private';
    }
  }

}
