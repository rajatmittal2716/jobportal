import { Component, OnInit } from '@angular/core';
import{DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-job-posts',
  templateUrl: './job-posts.component.html',
  styleUrls: ['./job-posts.component.scss']
})
export class JobPostsComponent implements OnInit {
  postid:any=this.route.snapshot.params.id;
  constructor(private data:DataService,private router : Router, private route: ActivatedRoute) { }
  jobs:object[]=[];
  ngOnInit()
   {
  
    this.jobdetails();
}
jobdetails()
{
  this.data.fetchJobDetail(this.route.snapshot.params.id).subscribe((res) => 
  {
     if(res['status']==200)
          {
            var arr =[]
             // console.log(res['data']);
             res.data.forEach(element => {
              var d = {
               name:element.name,
               address:element.address,
               intrest:element.intrestedin,
               experience:element.exprerience,
               tech:element.technology,
               email:element.email,id:element._id,
             }
             
              
               // var c=Object.assign({},{d})
               arr.push(d)
             });
             // console.log(arr,"arr")
             this.jobs = arr;
             // console.log(this.jobs,"SDfsdfsdfjlksadjflksjflldsfsadsd");
             
          }
         else if(res.status==403)
         {

             console.log(res['message']);
         }
         else if(arr.length<1)
         {
          this.router.navigate(['/Dashboard']);
         }
        })

}
sendmail(name,email)
{
  let user=
  {
    username:name,
    useremail:email
  }
  console.log(user.useremail);
  console.log(user.username);
  this.data.sendmail(user).subscribe((res)=>{
    if(res)
    {
      console.log(res);
    }

  })
}
deleteapplication(id)
{
  console.log("post id ============",this.postid);
  
  console.log("applicant id ",id);
  let ids=
  {
    pstid:this.postid,
    userid:id
  }
  this.data.deleteapplication(ids).subscribe((res)=>{
    if(res)
    {
      console.log(res);
      this.jobdetails();
    }
})
}
}