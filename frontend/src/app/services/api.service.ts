import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from '../classes/user'
import { Observable } from 'rxjs';


@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = 'http://localhost:8000/'

  public registerUser(user: User): Observable<any> {
    return this.http.post(this.baseUrl + 'register/', user)
  }

  public login(username: string, password: string): Observable<any> {
    let data = {
      'username': username,
      'password': password
    }
    return this.http.post(this.baseUrl + 'login/', data)  
  }

  public hashedLogin(username: string, password: string): Observable<any> {
    let data = {
      'username': username,
      'password': password
    }
    return this.http.post(this.baseUrl + 'hashedlogin/', data)  
  }
}
