import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClientModule } from '@angular/common/http';
import { HttpClient} from '@angular/common/http';
import { log } from 'util';



@Injectable({
  providedIn: 'root'
})
export class DataService
 {
 
  BaseURL: String = 'http://localhost:3000';
 
  constructor(private http:HttpClient) { }
 
 
  addJob(Post) : Observable<any>
    {
      console.log(Post,"from service");
      // let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
          let httpOptions = {
            headers : new HttpHeaders({
              'Content-Type' : 'application/json'
            })
          }
          return this.http.post(this.BaseURL + '/company/jobs/add',{jobs:Post}, httpOptions);
    }
    
  fetchJobs() : Observable<any>
    {
      
          return this.http.get(this.BaseURL + '/company/jobs/findjobs');
    }
      
  fetchJobDetail(id) : Observable <any>
      {
        // console.log(id);
            return this.http.get(this.BaseURL + '/company/job/details/'+id);
      }
    
  deleteJob(id)
     {
       console.log(id,"sdfsadfsfsfasdas");
       
        return this.http.delete(this.BaseURL + '/company/jobs/' + id);
      }
      sendmail(user)
      {
        let httpOptions = {
          headers : new HttpHeaders({
            'Content-Type' : 'application/json'
          })
        }
        return this.http.post(this.BaseURL + '/job/sendmail',{user:user},httpOptions);
      }  
      
      deleteapplication(id)
      {
        console.log(id)
        return this.http.post(this.BaseURL+'/company/post/delete',{id:id});
      }
}
