import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class SeekerAuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate() {
        if(this.authService.isLogin()) {
            return true;
        }
        else {
            this.router.navigate(['/loginpage']);
            return false;
        }
    }
}