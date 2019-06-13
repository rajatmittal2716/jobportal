import { Component, OnInit, ViewChild } from '@angular/core';
import {Validators,FormBuilder,FormGroup} from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  constructor(private fb : FormBuilder, private authService : AuthService, private flash : FlashMessagesService, private router : Router) { 
    this.minDate = new Date(1970, 0, 1);
    this.maxDate = new Date();
    // this.minDate.setDate(this.minDate.getDate() - 1);
    // this.maxDate.setDate(this.maxDate.getDate() + 7);
  }
  registerForm : FormGroup;
  ngOnInit() {
    this.registerForm = this.fb.group
    ({
      companyName : ['', [Validators.required]],
      Established: ['', [Validators.required]],
      contact : ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],//, Validators.pattern('^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$')
      address : ['', [Validators.required]],
      Password : ['', [Validators.required]],
      email:['',[Validators.required]],//,Validators.pattern('^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$')
      JobVacancies : ['', [Validators.required]],
      WorkingOn: ['', [Validators.required]]
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
    // if(user){
    //   this.flash.show("registration sucessfully", { cssClass : 'success', timeout : 3000 });

    // }
    this.authService.registercompany(user).subscribe((res) => {
      console.log(res);
      if(res['status']==200) {
        this.flash.show(res['message'], { cssClass : 'success', timeout : 3000 });
        this.router.navigate(['company/login']);
      }
      else {
        this.flash.show("something went wrong");
      }
    })
  }
  // res['message'], { cssClass : 'danger', timeout : 3000 }
}
