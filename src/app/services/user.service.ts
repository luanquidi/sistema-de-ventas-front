import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './GLOBAL';


// Model
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public url;
  public user;
  public token;
  public identity;

  constructor(
    private http: HttpClient,
  ) {
    this.url = GLOBAL.url;
    this.user = new User('', '', '', '', '');
  }

  login(user, getToken = null): Observable<any>{
    const json = user;

    if (getToken != null){
      user.gettoken = true;
    }

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // tslint:disable-next-line:object-literal-shorthand
    return this.http.post(`${this.url}/usuario/login`, json, {headers: headers});
  }

  getToken(): Observable<any> {
    const token = localStorage.getItem('token');
    if (token){
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;
  }

  getIdentity(): Observable<any> {
    const identity = JSON.parse(localStorage.getItem('identity'));

    if (identity){
      this.identity = identity;
    }else{
      this.identity = null;
    }

    return this.identity;
  }

}
