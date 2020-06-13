import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService
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
  
  public pageContent = {
    header:{
        title:'WSHFC Multifamily Application Portal',
        strapline: 'Making affordable homes and healthy communities a reality for everyone.'
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

}
