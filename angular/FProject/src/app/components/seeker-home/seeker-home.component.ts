import { Component, OnInit } from '@angular/core';
import { findComponentView } from '@angular/core/src/render3/util';
import {FormBuilder,FormGroup,FormControl, Validators} from '@angular/forms'
import {SeekerdataService} from '../../services/seeker/seekerdata.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seeker-home',
  templateUrl: './seeker-home.component.html',
  styleUrls: ['./seeker-home.component.scss']
})
export class SeekerHomeComponent implements OnInit {

  searchForm:FormGroup;
  constructor( private fb:FormBuilder,private dataService:SeekerdataService,private flash:FlashMessagesService,private router:Router) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      JobType:['',[Validators.required]],//,Validators.pattern('^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$')
    });
  }
  jobs: Object[] = [];
  Search()
  {
    console.log(this.searchForm.value);
    
       this.dataService.jobs(this.searchForm.value).subscribe((res) => {
        if(res['status']==200) 
        {
          if(res.data.length < 1)
             {
               this.flash.show('No job found ');
             }
             else
             {
                var arr =[]
                console.log(res['data']);
                res.data.forEach(element => 
              {
                var d = 
                    {
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
               var c=Object.assign({},{d})
               arr.push(c)
             });
              console.log(arr,"arr")
              this.jobs = arr;
              console.log(this.jobs,"SDfsdfsdfjlksadjflksjflldsfsadsd");
              res['message'], { cssClass : 'success', timeout: 3000 }
            }
        }
      
       else 
         {
          //  console.log(res.message)
             this.flash.show(res['message'], { cssClass : 'danger', timeout: 3000 });
         }
      
      })
    
    }   
    ApplyPost(data)
    {
      let data1={
       id:data
      }
      this.dataService.Applyjobs(data1).subscribe((res) =>{
       
        if(res['status']==200)
        {
          this.flash.show("applied sucessfully");
        }
      })
    }
   
 }
