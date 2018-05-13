import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service'
import { ApiService } from '../../../services/api.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private query: string;
  private searchType: number = -1;
  private searchResults: any[] = [];

  constructor(private common: CommonService, private api: ApiService) { }

  ngOnInit() { }

  private searchPeople() {
    this.searchType = 0;
    this.searchResults = []
    this.api.searchPeople(this.query).subscribe(
      response => {
        if (response['status'] == 'success') {
          for (let userData of response['data']) {
            let user = this.common.parseUser(userData)
            if (user.email != this.common.user.email) {
              this.searchResults.push(user);
            }
          }
        }
      }
    )
  }

}
