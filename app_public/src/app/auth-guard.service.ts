import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public authenticationService: AuthenticationService,
    public router: Router
    ) { }
    
    canActivate(): boolean{
        if(!this.authenticationService.isLoggedIn()){
            this.router.navigateByUrl('/');
            return false;
        }
        return true;
    }
    
}
