import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import * as crypto from 'crypto-js';
import { User } from '../classes/user'
import { Post } from '../classes/post'
import { Observable } from 'rxjs';


@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = 'http://localhost:8000/'

  public registerUser(user: User): Observable<any> {
    return this.http.post(this.baseUrl + 'register/', user)
  }

  public login(email: string, password: string): Observable<any> {
    let hashedPwd = crypto.SHA256(password);
    let data = {
      'email': email,
      'password': hashedPwd
    }
    return this.http.post(this.baseUrl + 'login/', data)  
  }

  public hashedLogin(email: string, password: string): Observable<any> {
    let data = {
      'email': email,
      'password': password
    }
    return this.http.post(this.baseUrl + 'hashedlogin/', data)  
  }

  public updateProfile(originalEmail: string, originalPassword: string, updatedUserInfo: User): Observable<any> {
    let hashedPwd = crypto.SHA256(originalPassword);
    let data = {
      'originalEmail': originalEmail,
      'originalPassword': hashedPwd,
      'updatedData': updatedUserInfo
    }
    return this.http.post(this.baseUrl + 'updateprofile/', data)  
  }

  public getRequestsCount(email: string): Observable<any> {
    let data = {
      'email': email
    } 
    return this.http.post(this.baseUrl + 'getrequestscount/', data)  
  }

  public getFriendRequests(email: string): Observable<any> {
    let data = {
      'email': email
    }
    return this.http.post(this.baseUrl + 'getfriendrequests/', data);
  }

  public getFriends(email: string): Observable<any>  {
    let data = {
      'email': email
    }
    return this.http.post(this.baseUrl + 'getfriends/', data);
  }

  public acceptFriendRequest(accepter: string, friend: string, returnProfile: boolean = false): Observable<any>  {
    let data = {
      'accepter': accepter,
      'friend': friend,
      'email': accepter,
      'viewed': friend,
      'returnProfile': returnProfile
    }
    return this.http.post(this.baseUrl + 'acceptfriendrequest/', data);
  }  

  public rejectFriendRequest(accepter: string, friend: string): Observable<any>  {
    let data = {
      'accepter': accepter,
      'friend': friend
    }
    return this.http.post(this.baseUrl + 'rejectfriendrequest/', data);
  }

  public searchPeople(query: string): Observable<any> {
    let data = {
      'query': query
    }
    return this.http.post(this.baseUrl + 'searchpoeple/', data);
  }

  public searchPosts(query: string): Observable<any> {
    let data = {
      'query': query
    }
    return this.http.post(this.baseUrl + 'searchposts/', data);
  }

  public publishPost(email: string ,post: Post): Observable<any> {
    let data = {
      'poster': email,
      'caption': post.caption,
      'isPublic': post.isPublic,
      'image': post.image,
    }
    return this.http.post(this.baseUrl + 'publishpost/', data);
  }

  public getAllPosts(email: string): Observable<any> {
    let data = {
      'email': email
    }
    return this.http.post(this.baseUrl + 'getallposts/', data);
  }

  public getProfileData(viewerEmail: string, viewedEmail: string): Observable<any> {
    let data = {
      'email': viewerEmail,
      'viewed': viewedEmail
    }
    return this.http.post(this.baseUrl + 'getprofile/', data);
  }

  public sendFriendRequest(senderEmail: string, receiverEmail: string): Observable<any> {
    let data = {
      'email': senderEmail,
      'viewed': receiverEmail
    }
    return this.http.post(this.baseUrl + 'sendrequest/', data);
  }
}
