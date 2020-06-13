import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  public pageContent = {
    header: {
        title: 'About us',
        strapline: ''
    },
    content: "We're here to make Washington even better. From developing affordable apartments, to making organizations more energy-efficient, our goal is to improve Washington's quality of life and create real, positive changes for the state's most vulnerable people.",
    sidenav: {
        strapline: 'Side nav works'
    }
    
  };

}
