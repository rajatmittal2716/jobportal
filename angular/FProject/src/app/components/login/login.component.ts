import { Component, OnInit } from '@angular/core';
import{FormsModule,FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import {  FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb:FormBuilder,private flash:FlashMessagesService,private authService:AuthService,private router:Router) { }

  ngOnInit() { 
    this.loginForm = this.fb.group({
    email:['',[Validators.required]],//,Validators.pattern('^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$')
    password : ['', [Validators.required]]
  });
  }
  registration()
  {
    this.router.navigate(['company/register']);
  }

  onLogin() {
  
    this.authService.logincompany(this.loginForm.value).subscribe((res) => {
      console.log(res,"reached login")
      if(res['status']==200) {
        localStorage.setItem('token', res['data']['token']);
        localStorage.setItem('userType','company');
        this.flash.show(res['message'], { cssClass : 'success', timeout: 3000 });        
        this.router.navigate(['/Dashboard']);
      }
      else {
        this.flash.show(res['message'], { cssClass : 'danger', timeout: 3000 });
        this.router.navigate(['company/login']);
      }
    })
  }
}
