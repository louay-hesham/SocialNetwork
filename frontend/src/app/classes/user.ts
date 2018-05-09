import * as crypto from 'crypto-js';

export class User {

  public password: string;
  public email: string;

  constructor () { }
  
  public toJSON(): any {
    let hashedPwd = crypto.SHA256(this.password)
    return {
      'password': hashedPwd,
      'email': this.email
    }
  }

  public toJSON_noEcryption(): any {
    return {
      'password': this.password,
      'email': this.email,
    }
  }
}
