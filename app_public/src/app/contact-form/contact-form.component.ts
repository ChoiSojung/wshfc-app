import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  public formError: string='';
  
  public message = {
    name: '',
    email: '',
    message: ''
  };
  
  public pageContent = {
    header:{
        title:'Contact us',
        strapline: ''
    },
    sidebar: {
        title:'Contact us',
        strapline: 'Learn more about our programs and how they help your community at ',
        url: 'www.wshfc.org'
    }
   
  };

  constructor() { }

  ngOnInit(): void {
  }
  
  public onContactSubmit(): void {
    this.formError = '';
    if (
        !this.message.name ||
        !this.message.email ||
        !this.message.message
    ) {
        this.formError = 'All fields are required.';
    } else {
        this.doContact();
    }
  }
  
  private doContact(): void{}
}
