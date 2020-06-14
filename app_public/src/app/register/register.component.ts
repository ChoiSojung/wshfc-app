import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public formError: string='';
  
  public credentials = {
    name: '',
    email: '',
    password: ''
  };
  
  public pageContent = {
    header: {
        title: 'Create a new account',
        strapline: ''
    },
    sidebar: {
        title:'Contact us',
        strapline: 'Learn more about our programs and how they help your community at ',
        url: 'www.wshfc.org'
    }
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(){
  }
  
  public onRegisterSubmit(): void {
    this.formError = '';
    if (
        !this.credentials.name ||
        !this.credentials.email ||
        !this.credentials.password
    ) {
        this.formError = 'All fields are required.';
    } else {
        this.doRegister();
    }
  }
  
  private doRegister(): void{
    this.authenticationService.register(this.credentials)
        .then(()=>{
            this.router.navigateByUrl('');
        })
        .catch((message)=> {
            this.formError = message
        });
  }

}
