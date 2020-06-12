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
        title:'WSHFC Application Portal',
        strapline: 'Register to start your application'
    },
    sidebar: 'Contact us at mhcfsupport@wshfc.org for questions or comments about this website'
  };

}
