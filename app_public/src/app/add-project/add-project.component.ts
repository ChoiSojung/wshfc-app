import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectDataService } from '../project-data.service';
import { NewProject } from '../project';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {  
  public NewProject: NewProject = {
    owner: '',
    name: '',
    address: ''
  };
  
  public formError: string;

  public pageContent = {
    header:{
        title:'Apply',
        strapline: ''
    }
  };

  constructor(
    private projectDataService: ProjectDataService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }
  
  ngOnInit(){
  }
  
  private formIsValid(): boolean {
    if(this.NewProject.name && this.NewProject.address){
        return true;
    } else {
        return false;
    }
  }
  
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
  
  public getUsername(): string {
    const user: User = this.authenticationService.getCurrentUser();
    return user ? user.name : '';
  }
  
  public onNewProjectSubmit(): void{
    this.formError = '';
    this.NewProject.owner = this.getUsername();
    if(this.formIsValid()){
        console.log(this.NewProject);
        this.projectDataService.addProject(this.NewProject)
            .then((project: NewProject)=>{
                console.log('Project saved', project);
            });
    } else {
        this.formError = 'All fields required, please try again';
    }
  }
  

}
