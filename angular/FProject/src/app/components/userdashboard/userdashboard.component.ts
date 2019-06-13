import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  constructor(private authServices:DataService) { }

  ngOnInit()
   {
    this.jobs();
  }
  jobs()
  {
  this.authServices.fetchJobs().subscribe((result)=>{
  
  })
  }
}
