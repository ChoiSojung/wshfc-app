import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public formError: string='';

  public credentials = {
    name: '',
    email: '',
    password: ''
  };
  
  public pageContent = {
    header:{
        title:'My Account',
        strapline: ''
    },
    sidebar: {
        title:'Contact us',
        strapline: 'Learn more about our programs and how they help your community at ',
        url: 'www.wshfc.org'
    },
    subtitle: 'Making affordable homes and healthy communities a reality for everyone.',
    register: 'Create an  to begin your application.',
    registerLink: 'account'
    
  };
  
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(){
  }
  
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
  
  public getUsername(): string {
    const user: User = this.authenticationService.getCurrentUser();
    return user ? user.name : 'Guest';
  }
  
  public getUserEmail(): string {
    const user: User = this.authenticationService.getCurrentUser();
    return user ? user.email : 'Email';
  }
  
  public onUpdateUserSubmit(): void {
    this.formError = '';
    if (
        !this.credentials.name ||
        !this.credentials.email ||
        !this.credentials.password
    ) {
        this.formError = 'All fields are required.';
    } else {
        this.doUpdateUser();
    }
  }
  
  private doUpdateUser(): void{
    this.authenticationService.register(this.credentials)
        .then(()=>{
            this.router.navigateByUrl('/profile');
        })
        .catch((message)=> {
            this.formError = message
        });
  }
  

}
