import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import * as crypto from 'crypto-js';
import { User } from '../classes/user'
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
}
