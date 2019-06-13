import { Component, OnInit } from '@angular/core';
import {Validators,FormBuilder,FormGroup} from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-seekerregister',
  templateUrl: './seekerregister.component.html',
  styleUrls: ['./seekerregister.component.scss']
})
export class SeekerregisterComponent implements OnInit {
  registerForm:FormGroup;
  constructor(private fb:FormBuilder,private flash:FlashMessagesService,private router:Router,private authService:AuthService) { }

  ngOnInit() {
    this.registerForm = this.fb.group
    ({
      name : ['', [Validators.required]],
      contact : ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],//, Validators.pattern('^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$')
      address : ['', [Validators.required]],
      password : ['', [Validators.required]],
      email:['',[Validators.required]],//,Validators.pattern('^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$')
      exprerience: ['',[Validators.required]],
      position: ['',[Validators.required]],
      technology: ['',[Validators.required]],
      intrestedin: ['',[Validators.required]],
    })
  }
  
 
  addressChange(event) {
    console.log(event.target.value);
    this.registerForm.patchValue({
      address : event.target.value
    })
  }
  onRegister() {
    let user = this.registerForm.value;
    
    this.authService.registerSeeker(user).subscribe((res) => {
      console.log(res);
      if(res.status==200) {
        this.flash.show(res['message'], { cssClass : 'success', timeout : 3000 });
        this.router.navigate(['seeker/login']);
      }
      else {
        this.flash.show(res['message'], { cssClass : 'danger', timeout : 3000 });
      }
    })
  }
}
