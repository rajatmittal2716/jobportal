import { Component, OnInit } from '@angular/core';
import{FormsModule,FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seekerlogin',
  templateUrl: './seekerlogin.component.html',
  styleUrls: ['./seekerlogin.component.scss']
})
export class SeekerloginComponent implements OnInit {
  loginForm: FormGroup;
  submit:boolean=false;
  constructor(private fb:FormBuilder,private authService:AuthService,private flash:FlashMessagesService,private router:Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email:['',[Validators.required]],//,Validators.pattern('^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$')
      password : ['', [Validators.required]]
    });
  }
  registration()
  {
    this.router.navigate(['seeker/register']);
  }
  onLogin() {
    if(this.loginForm.value)
    {
      this.submit=true;
    }
    else{
      this.submit=false
    }
    this.authService.loginseeker(this.loginForm.value).subscribe((res) => {
      if(res['status']==200) {
        localStorage.setItem('token', res['data']['token']);
        localStorage.setItem('userType', 'seeker');
        this.flash.show(res['message'], { cssClass : 'success', timeout: 1000 });        
        this.router.navigate(['/seeker']);
      }
      else {
        this.flash.show(res['message'], { cssClass : 'danger', timeout: 1000 });
        this.router.navigate(['seeker/login']);
      }
    })
  }
}
