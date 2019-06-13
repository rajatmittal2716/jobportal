import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { log } from 'util';
@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.scss']
})
export class DasboardComponent implements OnInit {
  jobs: Object[] = [];
  constructor(private dataServices:DataService,private fb:FormBuilder,private router:Router) { }
 
 ngOnInit() {
      this.fetchPost();  
     // Get the modal
      var modal = document.getElementById('myModal');  
      // Get the button that opens the modal
      var btn = document.getElementById("myBtn");  
      // Get the <span> element that closes the modal
      // var span = document.getElementsByClassName("close")[0];  
      // When the user clicks on the button, open the modal 
      btn.onclick = function() {
        modal.style.display = "block";
      }
  //  When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
    }
  
    JobPost: FormGroup = this.fb.group(
   {

      Salary : ['', [Validators.required, Validators.min(8000), Validators.max(1000000)]],
      JobType : ['', [Validators.required]],
      Vacancies : ['', [Validators.required]],
      Description : ['', [Validators.required]],
      Procedure:['', [Validators.required]],
      Employees : ['', Validators.required],
      experience : ['', Validators.required]

   })
  
    
    // //sddmg.sdei sdie#3005
  
    addJobs() 
    {      
      let jobs = this.JobPost.value;     
      this.dataServices.addJob(jobs).subscribe((res) =>
       {
         if(res['status']==200)
          {
            this.fetchPost();
            this.JobPost.reset();    
          }
      })                
    }
  
    deletePost(id)
    {
      this.dataServices.deleteJob(id).subscribe((res) =>
       {
          if(res['success']) 
          {
             this.fetchPost();
          }
      })
    }
  
    fetchPost()
     {
        this.dataServices.fetchJobs().subscribe((res) =>
         {
            if(res['status']==200)
             {
               var arr =[]
                // console.log(res['data']);
                res.data.forEach(element => {
                 var d = {
                  applications:element.application.length > 0 ? element.application : 0,
                  id:element._id,
                  description:element.Description,
                  Employees:element.Employees,
                  JobType:element.JobType,
                  Procedure:element.Procedure,
                  salary:element.Salary,
                  Vacancies:element.Vacancies,
                  companyname:element.companyName.companyName
                }
                
                 
                  // var c=Object.assign({},{d})
                  arr.push(d)
                });
                // console.log(arr,"arr")
                this.jobs = arr;
                // console.log(this.jobs,"SDfsdfsdfjlksadjflksjflldsfsadsd");
                
             }
            else 
            {
                console.log(res['message']);
            }
        })
    }
  
    JobDetail(id) 
    {
      console.log(id);
      this.router.navigate(['/post/'+id]);
    }
  
}
