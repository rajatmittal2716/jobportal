import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { JobPostsComponent } from './components/job-posts/job-posts.component';
import { AuthGuard } from './guards/auth.guard';
import { SeekerloginComponent } from './components/seekerlogin/seekerlogin.component';
import { SeekerregisterComponent } from './components/seekerregister/seekerregister.component';
import { SeekerHomeComponent } from './components/seeker-home/seeker-home.component';
import { DasboardComponent } from './components/dasboard/dasboard.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { ContactComponent } from './components/contact/contact.component';
import { SeekerAuthGuard } from './guards/seekerauth.guard';


const routes: Routes = [
  {path:'loginpage' ,
  component:LoginpageComponent
},
  {path:'Dashboard' ,component:DasboardComponent,canActivate:[AuthGuard]},
  {path:'' ,component:HomeComponent},
  {path:'contactUs' ,component:ContactComponent},
  {path:'registration' ,component:RegistrationComponent},
  {path:'seeker' ,component:SeekerHomeComponent,canActivate:[SeekerAuthGuard]},  
  {path:'company/login' ,component:LoginComponent},
  {path:'company/register' ,component:RegisterComponent},
  {path:'seeker/login' ,component:SeekerloginComponent},
  {path:'seeker/register' ,component:SeekerregisterComponent},
  {path:'post/:id' ,component:JobPostsComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// canActivate:[AuthGuard]