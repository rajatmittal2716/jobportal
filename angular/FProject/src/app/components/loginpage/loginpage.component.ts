import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AuthGuard} from '../../guards/auth.guard';
@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {

  constructor( private authService:AuthService,private authGuard:AuthGuard) { }

  ngOnInit() {
  }

}
