import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{ReactiveFormsModule,FormsModule} from '@angular/forms';
import { DasboardComponent } from './components/dasboard/dasboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { JobPostsComponent } from './components/job-posts/job-posts.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {AuthGuard} from './guards/auth.guard';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { from } from 'rxjs';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainInterceptor } from './interceptors/main.interceptor';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { SeekerregisterComponent } from './components/seekerregister/seekerregister.component';
import {SeekerloginComponent} from './components/seekerlogin/seekerlogin.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker'
import { SeekerHomeComponent } from './components/seeker-home/seeker-home.component';
import { AuthService } from './services/auth.service';
import { UserdashboardComponent } from './components/userdashboard/userdashboard.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import {SeekerdataService} from './services/seeker/seekerdata.service';
import { SeekerAuthGuard } from './guards/seekerauth.guard';

@NgModule({
  declarations: [
    AppComponent,
    DasboardComponent,
    LoginComponent,
    RegisterComponent,
    JobPostsComponent,
    ContactComponent,
    HomeComponent,
    NavbarComponent,
    SeekerloginComponent,
    SeekerregisterComponent,
    SeekerHomeComponent,
    UserdashboardComponent,
    RegistrationComponent,
    LoginpageComponent,
     
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    GooglePlaceModule,
    FlashMessagesModule.forRoot(),
    HttpClientModule
  ],
  providers: [AuthService,FlashMessagesService, AuthGuard,SeekerdataService,SeekerAuthGuard,
    {
      provide: HTTP_INTERCEPTORS, useClass: MainInterceptor, multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
