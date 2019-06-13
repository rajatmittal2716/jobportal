import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BaseURL: String = 'http://localhost:3000';

  constructor(private http : HttpClient) { }

  isAuthenticated() : Boolean {
    if(localStorage.getItem('token')&& localStorage.getItem('userType') == 'company') //&& localStorage.getItem('userType') == 'company'
    {
      return true;
    }
    else {
      return false;
    }
  }
  isLogin() : Boolean {
    if(localStorage.getItem('token')  && localStorage.getItem('userType') == 'seeker') {
      return true;
    }
    else {
      return false;
    }
  }

  loginseeker(data): Observable<any> {
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }
    return this.http.post( this.BaseURL + '/seeker/login', data, httpOptions );
  }
  logincompany(data): Observable<any> {
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }
    return this.http.post( this.BaseURL + '/company/login', data, httpOptions );
  }

  registerSeeker(data): Observable<any> {
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }
    return this.http.post( this.BaseURL + '/seeker/register', data, httpOptions );
  }
  registercompany(data): Observable<any> {
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }
    return this.http.post( this.BaseURL + '/company/register', data, httpOptions );
  }
//   addJob(Post) : Observable<any> {
//     let httpOptions = {
//       headers : new HttpHeaders({
//         'Content-Type' : 'application/json'
//       })
//     }
//     return this.http.post(this.BaseURL + '/post', {post:Post}, httpOptions);
//   }

//   fetchJobs() : Observable<any> {
//     return this.http.get(this.BaseURL + '/post');
//   }

//   fetchJobDetail(id) : Observable <any> {
//     return this.http.get(this.BaseURL + '/post/' + id);
//   }

//   deleteJob(id){
//     return this.http.delete(this.BaseURL + '/post/' + id);
//   }
 }
