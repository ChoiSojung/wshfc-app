import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(){
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
