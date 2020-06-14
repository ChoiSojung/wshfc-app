import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectDataService } from '../project-data.service';
import { NewProject } from '../project';
import { dbUser } from '../user';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {  
  public newProject: NewProject = {
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
    if(this.newProject.name && this.newProject.address){
        return true;
    } else {
        return false;
    }
  }
  
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
  
  public getUsername(): string {
    const user: dbUser = this.authenticationService.getCurrentUser();
    return user ? user.name : '';
  }
  
  public getUserId(): string {
    const user: dbUser = this.authenticationService.getCurrentUser();
    return user ? user._id : '';
  }
  
  public onNewProjectSubmit(): void{
    this.formError = '';
    this.newProject.owner = this.getUserId();
    if(this.formIsValid()){
        console.log(this.newProject);
        this.projectDataService.addProject(this.newProject)
            .then((project: NewProject)=>{
                console.log('Project saved', project);
            });
    } else {
        this.formError = 'All fields required, please try again';
    }
  }
  

}
