import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClientModule } from '@angular/common/http';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SeekerdataService {

  BaseURL: String = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

jobs(data) : Observable<any>
{
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }
    return this.http.post(this.BaseURL + '/seeker/jobs',data, httpOptions);
}

Applyjobs(data): Observable<any>
{
  let httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }
  return this.http.post(this.BaseURL + '/seeker/applyjobs',data, httpOptions);
}

}
