import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginEmail: string;
  private loginPassword: string;

  constructor() { }

  ngOnInit() { }

  private login() {
    console.log(this.loginEmail);
    console.log(this.loginPassword);
  }

}
