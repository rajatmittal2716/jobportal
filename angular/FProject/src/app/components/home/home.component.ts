import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AuthGuard} from '../../guards/auth.guard';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private authService:AuthService,private authGuard:AuthGuard) { }

  ngOnInit() {
  }

}
